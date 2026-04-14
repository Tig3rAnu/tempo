import { promises as fs } from 'fs'
import path from 'path'
import { DataTable } from '@/components/common/dataTable'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, Plus } from 'lucide-react'
import { z } from 'zod'
import { studentSchema } from '@/schemas/studentSchema'
import { columns } from './components/column'

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(dashboard)/(routes)/students/data/students.json'
    )
  )
  const students = JSON.parse(data.toString())
  return z.array(studentSchema).parse(students)
}

export default async function StudentPage() {
  const student = await getTasks()
  return (
    <div className="p-8 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <Button className="mr-3 bg-transparent border-none text-black shadow-none hover:text-black dark:text-white p-0">
            <ArrowLeftCircle />
          </Button>
          <div>
            <h2 className="font-semibold text-2xl text-black dark:text-white">
              Students
            </h2>
            <p className="text-slate-600">
              Release of Letraset sheets containing Lorem
            </p>
          </div>
        </div>
        <Button className="bg-[#FFB600] rounded-2xl px-4 py-2 text-black text-xl font-medium">
          <Plus />
          Add New
        </Button>
      </div>
      <div className="pt-8">
        <DataTable data={student} columns={columns} />
      </div>
    </div>
  )
}
