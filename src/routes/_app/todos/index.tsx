import { createFileRoute } from '@tanstack/react-router'

import { getTodos } from '#/features/todos/api/get-todos.functions'
import { TodoDataGrid } from '#/features/todos/components/todo-data-grid'

export const Route = createFileRoute('/_app/todos/')({
  loader: async () => {
    const todos = await getTodos()

    return { todos }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { todos } = Route.useLoaderData()

  return (
    <div className="p-4">
      <TodoDataGrid data={todos} />
    </div>
  )
}
