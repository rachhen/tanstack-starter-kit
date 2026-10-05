import { createServerFn } from '@tanstack/react-start'

import { db, schema } from '#/db'
import { ownerMiddleware } from '#/middleware/owner.server'

import { TodoSchema } from '../validators/todo'

export const createTodo = createServerFn({ method: 'POST' })
  .middleware([ownerMiddleware])
  .validator(TodoSchema)
  .handler(async ({ data, context }) => {
    const [todo] = await db
      .insert(schema.todos)
      .values({ ...data, ownerId: context.owner.id })
      .returning()

    return todo
  })
