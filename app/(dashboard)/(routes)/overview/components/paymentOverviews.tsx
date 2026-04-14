import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isEmpty } from 'lodash'

export default function PaymentsOverview() {
  const payments = [
    {
      id: '1254656',
      name: 'Mayank Fouzdar',
      amount: '800',
      status: 'Confirm',
      date: '12/09/2023',
    },
    {
      id: '1254657',
      name: 'Vikash Gupta',
      amount: '600',
      status: 'Confirm',
      date: '12/09/2023',
    },
    {
      id: '1254658',
      name: 'Vishvendra Singh',
      amount: '700',
      status: 'Panding',
      date: '12/09/2023',
    },
    {
      id: '1254659',
      name: 'Sankalp Shrivastav',
      amount: '500',
      status: 'Failed',
      date: '12/09/2023',
    },
    {
      id: '1254660',
      name: 'Rudransh Singh',
      amount: '300',
      status: 'Panding',
      date: '12/09/2023',
    },
    {
      id: '1254661',
      name: 'Arpita Singh',
      amount: '900',
      status: 'Confirm',
      date: '12/09/2023',
    },
    {
      id: '1254662',
      name: 'Anuj Fouzdar',
      amount: '800',
      status: 'Failed',
      date: '12/09/2023',
    },
  ]
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#FFE49B] dark:bg-black p-1">
          <TableRow>
            <TableHead className="w-[100px] font-semibold text-base text-black dark:text-white">
              Id
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Name
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Amount
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white text-center">
              Status
            </TableHead>
            <TableHead className="font-bold text-base text-black dark:text-white">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isEmpty(payments)
            ? payments.map((pay) => {
                return (
                  <TableRow key={pay.id}>
                    <TableCell className="text-base text-black dark:text-white">
                      {pay.id}
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white">
                      {pay.name}
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white">
                      {pay.amount}
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white text-center">
                      <span
                        className={`border-2 inline-block px-4 text-center  border-solid rounded-full  ${
                          pay.status === 'Confirm'
                            ? 'border-green-600'
                            : pay.status === 'Failed'
                            ? 'border-red-700'
                            : 'border-orange-600 '
                        }`}
                      >
                        {pay.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-base text-black dark:text-white">
                      {pay.date}
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
