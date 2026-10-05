import { formOptions } from '@tanstack/react-form'
import type z from 'zod'

import { FieldGroup } from '#/components/ui/field'
import { withForm } from '#/hooks/form'

import { TodoSchema } from '../validators/todo'

const defaultValues: z.input<typeof TodoSchema> = {
  title: '',
  done: false,
}

export const todoFormOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: TodoSchema,
  },
})

export const TodoFields = withForm({
  ...todoFormOpts,
  render: ({ form }) => {
    return (
      <FieldGroup>
        <form.AppField
          name="title"
          children={(field) => <field.TextField label="Title" />}
        />
        <form.AppField
          name="done"
          children={(field) => <field.CheckboxField label="Done" />}
        />
      </FieldGroup>
    )
  },
})
