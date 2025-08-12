import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

function FormInput({
  form,
  fieldName,
  placeholder,
  type,
  disabled,
}: {
  form: any
  fieldName: string
  placeholder: string
  type: string
  disabled?: boolean
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-third">{fieldName}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
