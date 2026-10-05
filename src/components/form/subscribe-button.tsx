import type { ComponentProps } from 'react'

import { useFormContext } from '#/contexts/form'

import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export const SubscribeButton = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} {...props}>
          {isSubmitting && <Spinner />}
          {children}
        </Button>
      )}
    </form.Subscribe>
  )
}
