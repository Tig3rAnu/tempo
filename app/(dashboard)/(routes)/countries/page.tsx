import { promises as fs } from 'fs'
import { DataTable } from '@/components/common/dataTable'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, Plus } from 'lucide-react'
import path from 'path'
import { z } from 'zod'
import { countrieSchema } from '@/schemas/countriesSchema'
import { columns } from './components/column'

async function getCountries() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(dashboard)/(routes)/countries/data/countries.json'
    )
  )
  const country = JSON.parse(data.toString())
  return z.array(countrieSchema).parse(country)
}

export default async function CountriesPage() {
  const countries = await getCountries()
  return (
    <div className="p-8 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <Button className="mr-3 bg-transparent border-none text-black shadow-none hover:text-black dark:text-white p-0">
            <ArrowLeftCircle />
          </Button>
          <div>
            <h2 className="font-semibold text-2xl text-black dark:text-white">
              Countries
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
        <DataTable data={countries} columns={columns} />
      </div>
    </div>
  )
}
