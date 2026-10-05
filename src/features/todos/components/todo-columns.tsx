import { createColumnHelper } from '@tanstack/react-table'

import type { DataGridFeatures } from '#/components/reui/data-grid/data-grid'
import { DataGridColumnHeader } from '#/components/reui/data-grid/data-grid-column-header'
import type { GetTodos } from '../server/get-todos.functions'

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataGridFeatures, GetTodos[number]>()

export const todoColumns = columnHelper.columns([
  columnHelper.display({
    id: 'id',
    header: ({ column }) => <DataGridColumnHeader column={column} title="#" />,
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor('title', {
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Title" />
    ),
  }),
  columnHelper.accessor('done', {
    header: ({ column }) => (
      <DataGridColumnHeader column={column} title="Done" />
    ),
  }),
  columnHelper.display({
    id: 'actions',
  }),
])
