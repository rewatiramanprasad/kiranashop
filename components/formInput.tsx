import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type inputProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  fieldName: Path<T>
  placeHolder: string
  formType: string
  disabled?: boolean
}

function FormInput<T extends FieldValues>({
  form,
  fieldName,
  placeHolder,
  formType,
  disabled,
}: inputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem>
          <FormLabel className="text-third">{fieldName}</FormLabel>
          <FormControl>
            <Input
              type={formType}
              placeholder={placeHolder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
