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
import MultiSelect from 'react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import university from '../data/universities.json'

export function AddUniversityForm() {
  const tempOptions: any = []
  university.map((c) => {
    c.courses.map((el) => {
      tempOptions.push({ label: el.name, value: el.name })
    })
  })
  const form = useForm()
  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-7">
          <div className="flex items-center flex-wrap">
            <div className="w-full pr-4 mb-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter university name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full pr-4 mb-4">
              <FormField
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full pr-4 mb-4">
              <label htmlFor="course" className="mb-2 inline-block">
                Course
              </label>
              <MultiSelect
                isMulti
                name="course"
                id="course"
                options={tempOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="w-full pr-4 mb-4">
              <FormField
                name="Admission_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Admission Fees</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full pr-4 mb-4">
              <FormField
                name="indian_students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Indian Students</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="please select"
                          />
                          <SelectContent>
                            <SelectItem value="20">below 20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="150">More than 100</SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
