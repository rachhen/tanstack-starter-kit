import { createServerFn } from '@tanstack/react-start'

import { db } from '#/db'
import { ownerMiddleware } from '#/middleware/owner.server'

export const getTodos = createServerFn()
  .middleware([ownerMiddleware])
  .handler(async ({ context }) => {
    const todos = await db.query.todos.findMany({
      where(fields, operators) {
        return operators.eq(fields.ownerId, context.owner.id)
      },
    })

    return todos
  })

export type GetTodos = Awaited<ReturnType<typeof getTodos>>
