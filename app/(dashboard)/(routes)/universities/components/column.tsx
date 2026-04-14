'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from '@/components/common/tableActions/data-table-row-actions'
import { Universitty } from '@/schemas/universitySchema'
import Link from 'next/link'
// import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Universitty>[] = [
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
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => <div>{row.getValue('country')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Courses" />
    ),
    cell: ({ row }) => (
      <div>
        <Link
          href={`/course/${row.getValue('id')}`}
          className="underline decoration-1 decoration-blue-700 text-blue-700"
        >
          View full details
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'admissionFee',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Addmission Fee"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('admissionFee')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
