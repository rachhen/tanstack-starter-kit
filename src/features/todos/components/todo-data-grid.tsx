import { useTable } from '@tanstack/react-table'

import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
} from '#/components/reui/data-grid/data-grid'
import { DataGridPagination } from '#/components/reui/data-grid/data-grid-pagination'
import { DataGridScrollArea } from '#/components/reui/data-grid/data-grid-scroll-area'
import { DataGridTable } from '#/components/reui/data-grid/data-grid-table'
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

import type { GetTodos } from '../api/get-todos.functions'
import { AddTodo } from './add-todo'
import { todoColumns } from './todo-columns'

type Props = {
  data: GetTodos
}
export const TodoDataGrid = ({ data }: Props) => {
  const table = useTable({
    features: dataGridFeatures,
    columns: todoColumns,
    data,
    // pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
  })

  return (
    <DataGrid
      table={table}
      recordCount={data.length || 0}
      tableLayout={{
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Todos</CardTitle>
          <CardAction>
            <AddTodo />
          </CardAction>
        </CardHeader>
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
