import { promises as fs } from 'fs'
import { DataTable } from '@/components/common/dataTable'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, Plus } from 'lucide-react'
import path from 'path'
import { z } from 'zod'
import { agentSchema } from '@/schemas/agentSchema'
import { columns } from './components/column'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AgentForm } from './components/agent-form'

async function getAgents() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(dashboard)/(routes)/agents/data/agents.json')
  )
  const agents = JSON.parse(data.toString())
  return z.array(agentSchema).parse(agents)
}

export default async function AgentsPage() {
  const universiity = await getAgents()
  return (
    <div className="p-8 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <Button className="mr-3 bg-transparent border-none text-black shadow-none hover:text-black dark:text-white p-0">
            <ArrowLeftCircle />
          </Button>
          <div>
            <h2 className="font-semibold text-2xl text-black dark:text-white">
              Agents
            </h2>
            <p className="text-slate-600">
              Release of Letraset sheets containing Lorem
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#FFB600] rounded-2xl px-4 py-2 text-black text-xl font-medium">
              <Plus />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Agent</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <AgentForm />
            {/* <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      <div className="pt-8">
        <DataTable data={universiity} columns={columns} />
      </div>
    </div>
  )
}
