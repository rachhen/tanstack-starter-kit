import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { useAppForm } from '#/hooks/form'
import { useRouter } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { createTodo } from '../api/create-todo.functions'
import { TodoFields, todoFormOpts } from './todo-fields'

export const AddTodo = () => {
  const router = useRouter()
  const form = useAppForm({
    ...todoFormOpts,
    onSubmit: async ({ value }) => {
      try {
        await createTodo({ data: value })
        await router.invalidate()
        toast.success('Todo created successfully')
      } catch (err: any) {
        toast.error(err.message)
      }
    },
  })

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Add Todo
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>Create new todo</DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <TodoFields form={form} />
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <form.AppForm>
            <form.SubscribeButton type="submit" form="todo-form">
              Save changes
            </form.SubscribeButton>
          </form.AppForm>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
