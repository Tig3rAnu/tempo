import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeftCircle, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CourseForm } from './components/course-form'

export default function CoursePage() {
  return (
    <div className="p-8 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <Button className="mr-3 bg-transparent border-none text-black shadow-none hover:text-black dark:text-white p-0">
            <ArrowLeftCircle />
          </Button>
          <div>
            <h2 className="font-semibold text-2xl text-black dark:text-white">
              Course Details
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
              <DialogTitle>Add Course</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <CourseForm />
            {/* <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8 bg-[#F2F2F2] dark:bg-black rounded-2xl lg:p-28 md:p-10 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="font-bold text-5xl text-black dark:text-white underline decoration-2 mb-6">
            Al-Farabi Kazakh National University
          </h2>
          <h2 className="text-6xl font-bold text-[#1361D2] mb-16">
            kazakhstan
          </h2>
        </div>
        <div className="flex items-center flex-wrap">
          <div className="pb-12 pr-8 w-1/3">
            <Card className="text-center bg-[#A6C2ED] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MBBS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
          <div className="pb-12 pr-6 w-1/3">
            <Card className="text-center bg-[#FFE49B99] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
          <div className="pb-12 w-1/3">
            <Card className="text-center bg-[#1546FF57] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MBBS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
          <div className="pr-8 w-1/3">
            <Card className="text-center bg-[#FFB60014] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
          <div className="pr-8 w-1/3">
            <Card className="text-center bg-[#A6C2ED1F] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MBBS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
          <div className="w-1/3">
            <Card className="text-center bg-[#FFE49B99] h-52 flex justify-center items-center flex-wrap">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                <CardTitle className="font-bold text-5xl text-center w-full">
                  MD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-2xl">Duration: 5years</div>
                <div className="font-medium text-2xl">Fee-19,00000</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
