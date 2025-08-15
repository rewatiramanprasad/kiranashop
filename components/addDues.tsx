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
import DateInput from '@/components/dateInputs'

const formSchema = z.object({
  Name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  Mobile: z.string().min(10, {
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

function AddDue({ id }: { id?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Mobile: '',
      Amount: '',
      Remarks: '',
      Date: new Date(),
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:3000/api/addCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id }),
      })
      const resData = await response.json()
      console.log(resData)
      if (resData.success) {
        form.reset()
        toast.info('Customer added successfully')
      } else {
        throw new Error('Failed to add customer')
      }
    } catch (error) {
      console.error('Error adding customer:', error)
      toast.error('Failed to add customer. Please try again.')
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
          />
          <FormInput
            form={form}
            fieldName={'Mobile'}
            placeholder="Mobile..."
            type="text"
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
