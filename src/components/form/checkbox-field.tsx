import { useSelector } from '@tanstack/react-form'
import type { ComponentProps } from 'react'

import { useFieldContext } from '#/contexts/form'

import { Checkbox } from '../ui/checkbox'
import { Field, FieldError, FieldLabel } from '../ui/field'

type Props = ComponentProps<typeof Checkbox> & {
  label: string
}
export const CheckboxField = ({ label, ...props }: Props) => {
  const field = useFieldContext<boolean>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        {...props}
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(value) => field.handleChange(value)}
        aria-invalid={isInvalid}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}
