import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isEmpty } from 'lodash'

export default function RecentUserOverview() {
  const payments = [
    {
      id: '1254656',
      name: 'Mayank Fouzdar',
      type: 'Student',
      date: '12/09/2023',
    },
    {
      id: '1254657',
      name: 'Vikash Gupta',
      type: 'Student',
      date: '12/09/2023',
    },
    {
      id: '1254658',
      name: 'Vishvendra Singh',
      type: 'Agent',
      date: '12/09/2023',
    },
    {
      id: '1254659',
      name: 'Sankalp Shrivastav',
      type: 'Student',
      date: '12/09/2023',
    },
    {
      id: '1254660',
      name: 'Rudransh Singh',
      type: 'Agent',
      date: '12/09/2023',
    },
    {
      id: '1254661',
      name: 'Arpita Singh',
      type: 'Student',
      date: '12/09/2023',
    },
    {
      id: '1254662',
      name: 'Anuj Fouzdar',
      type: 'Agent',
      date: '12/09/2023',
    },
  ]
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#FFE49B] dark:bg-black p-1">
          <TableRow>
            <TableHead className="w-[150px] font-semibold text-base text-black dark:text-white">
              Id
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Name
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Type
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isEmpty(payments)
            ? payments.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="text-base text-black dark:text-white">
                      {user.id}
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white">
                      {user.name}
                    </TableCell>
                    <TableCell
                      className={`text-base text-black dark:text-white ${
                        user.type === 'Agent'
                          ? 'text-blue-700'
                          : 'text-green-600'
                      }`}
                    >
                      {user.type}
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white">
                      {user.date}
                    </TableCell>
                  </TableRow>
                )
              })
            : 'No data found'}
        </TableBody>
      </Table>
    </div>
  )
}
