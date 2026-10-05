import { createFormHook } from '@tanstack/react-form'

import { CheckboxField } from '#/components/form/checkbox-field'
import { SubscribeButton } from '#/components/form/subscribe-button'
import { TextField } from '#/components/form/text-field'
import { TextareaField } from '#/components/form/textarea-field'
import { fieldContext, formContext } from '#/contexts/form'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
    CheckboxField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
