'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CourseForm() {
  const form = useForm()
  return (
    <>
      <Form {...form}>
        <form className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-1 gap-8">
            <FormField
              name="course_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Course name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="course duration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="course_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Fee</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="course fee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select university</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select university"
                        />
                        <SelectContent>
                          <SelectItem value="Al-Farabi Kazakh National University">
                            Al-Farabi Kazakh National University
                          </SelectItem>
                          <SelectItem value="Mari State University">
                            Mari State University
                          </SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                className="hover:bg-black hover:text-white transition-all"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
