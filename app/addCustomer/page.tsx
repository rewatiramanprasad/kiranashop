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
import { useRouter } from 'next/navigation'
import { Customer } from '@/server/duesModel'
import { AddMember } from '@/server/action'

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
  Remarks: z.string().optional()
  
})
 type formSchemaType = z.infer<typeof formSchema>
function AddCustomer() {
  const router = useRouter()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Mobile: '',
      Amount: '',
      Remarks: '',
    },
  })
  async function onSubmit(values: formSchemaType) {
    const mapping:Customer={
      name:values.Name,
      mobile:Number(values.Mobile),
      amount:Number(values.Amount),
      remarks:values.Remarks
    }
    try {
      await AddMember(mapping)
      form.reset()
      toast.info('Customer added successfully')
      router.push('/list')
    } catch (error) {
      console.error('Error adding customer:', error)
      toast.error('Failed to add customer. Please try again.')
    }
  }

  return (
    <Container>
      <Heading title={'Add Customer'} />
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
          />
          <FormInput<formSchemaType>
            form={form}
            fieldName={'Mobile'}
            placeHolder="Mobile..."
            formType="text"
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

export default AddCustomer
