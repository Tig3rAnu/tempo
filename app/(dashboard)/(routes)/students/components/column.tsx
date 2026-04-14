'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Students } from '@/schemas/studentSchema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from '@/components/common/tableActions/data-table-row-actions'
// import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Students>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'agent_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent Id" />
    ),
    cell: ({ row }) => <div>{row.getValue('agent_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'university',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="University" />
    ),
    cell: ({ row }) => <div>{row.getValue('university')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => <div>{row.getValue('course')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => <div>{row.getValue('country')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'applicationStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Status" />
    ),
    cell: ({ row }) => (
      <div
        className={
          row.getValue('applicationStatus') === 'Approved'
            ? 'text-green-600'
            : row.getValue('applicationStatus') === 'Rejected'
            ? 'text-red-700'
            : 'text-orange-500'
        }
      >
        {row.getValue('applicationStatus')}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
