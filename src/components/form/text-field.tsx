import { useSelector } from '@tanstack/react-form'
import type { ComponentProps } from 'react'

import { useFieldContext } from '#/contexts/form'

import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type Props = ComponentProps<'input'> & {
  label: string
}
export const TextField = ({ label, ...props }: Props) => {
  const field = useFieldContext<string>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}
