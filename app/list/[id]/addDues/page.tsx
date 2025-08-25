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
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/store'
import { useRouter } from 'next/navigation'
import { AddDuesHandler } from '@/server/action'

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
type formSchemaType = z.infer<typeof formSchema>

function AddDue() {
  const router = useRouter()
  const id = useSelector((state: RootState) => state.CustomerDetails.id)
  const name = useSelector((state: RootState) => state.CustomerDetails.name)
  const mobile = useSelector((state: RootState) => state.CustomerDetails.mobile)
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: name || '',
      Mobile: mobile,
      Amount: '',
      Remarks: '',
      Date: new Date(),
    },
  })
  async function onSubmit(values: formSchemaType) {
    try {
      console.log(values)
      await AddDuesHandler({
        name: values.Name,
        mobile: values.Mobile,
        amount: Number(values.Amount),
        remarks: values.Remarks,
        date: values.Date,
        id,
      })
      toast.info('Dues added successfully')
      router.push(`/list/${id}`)
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
          <FormInput<formSchemaType>
            form={form}
            fieldName={'Name'}
            placeHolder="Name..."
            formType="text"
            disabled
          />
          <FormInput<formSchemaType>
            form={form}
            fieldName={'Mobile'}
            placeHolder="Mobile..."
            formType="text"
            disabled
          />
          <FormInput<formSchemaType>
            form={form}
            fieldName={'Amount'}
            placeHolder="Amount..."
            formType="text"
          />
          <FormInput<formSchemaType>
            form={form}
            fieldName={'Remarks'}
            placeHolder="Remarks..."
            formType="text"
          />
          <DateInput<formSchemaType> form={form} fieldName={'Date'} />

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
