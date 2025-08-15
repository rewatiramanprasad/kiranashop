'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Container from '@/components/container'
import Heading from '@/components/heading'
import FormInput from '@/components/formInput'
import React from 'react'
import { toast } from 'sonner'
import DateInput from '@/components/DateInput'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/store'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  Name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  Mobile: z.number().min(10, {
    message: 'Mobile number must be at least 10 characters.',
  }),
  Amount: z.string().min(1, {
    message: 'Amount is required.',
  }),
  Remarks: z.string().min(2, {
    message: 'Remarks must be at least 2 characters.',
  }),
  Date: z.date().refine((date) => date <= new Date(), {
    message: 'Date cannot be in the future.',
  }),
})

function AddDue() {
  const router = useRouter()
  const id = useSelector((state: RootState) => state.CustomerDetails.id)
  const name = useSelector((state: RootState) => state.CustomerDetails.name)
  const mobile = useSelector((state: RootState) => state.CustomerDetails.mobile)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: name || '',
      Mobile: parseInt(mobile),
      Amount: '',
      Remarks: '',
      Date: new Date(),
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:3000/api/addDues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id }),
      })
      const resData = await response.json()
      
      if (resData.success) {
        form.reset()
        toast.info('Dues added successfully')
        router.back()
      } else {
        throw new Error('Failed to add dues')
      }
    } catch (error) {
      console.error('Error adding dues:', error)
      toast.error('Failed to add dues. Please try again.')
    }
  }

  return (
    <Container>
      <Heading title={'Add Dues'} backButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={() => form.reset()}
          className="space-y-8"
        >
          <FormInput
            form={form}
            fieldName={'Name'}
            placeholder="Name..."
            type="text"
            disabled
          />
          <FormInput
            form={form}
            fieldName={'Mobile'}
            placeholder="Mobile..."
            type="text"
            disabled
          />
          <FormInput
            form={form}
            fieldName={'Amount'}
            placeholder="Amount..."
            type="text"
          />
          <FormInput
            form={form}
            fieldName={'Remarks'}
            placeholder="Remarks..."
            type="text"
          />
          <DateInput form={form} />

          <div className="flex justify-center gap-2 items-center">
            <Button className="w-1/2 bg-second " type="submit">
              Submit
            </Button>
            <Button className="w-1/2 bg-second" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default AddDue
