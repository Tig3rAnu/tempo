'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeftCircle, Pen, PlusCircle, Trash } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  agent_id: z.string().min(1),
  full_name: z.string().min(1),
  user_name: z.string().min(8),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
  email: z.string().min(1),
})

export default function SettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: 'admin',
      full_name: 'Vishvendra Singh',
      user_name: 'vishvendra@98',
      password: '1234567',
      confirm_password: '1234567',
      email: 'vishvendra@test.com',
    },
  })
  return (
    <div className="w-3/4 mx-auto mt-10">
      <div className="flex items-start w-full justify-between">
        <div className="flex flex-wrap items-center">
          <Button className="mr-3 bg-transparent border-none text-black shadow-none hover:text-black dark:text-white p-0">
            <ArrowLeftCircle />
          </Button>
          <h2 className="font-semibold text-2xl text-black dark:text-white">
            Settings
          </h2>
          <p className="text-slate-600 w-full">Add/Edit admins/agents</p>
        </div>
        <div className="p-5 flex items-center justify-center">
          <Button className="shadow-none  border border-black px-2 py-0">
            <PlusCircle size={20} className="mr-2" /> Add
          </Button>
        </div>
      </div>
      <div className="flex items-center w-full mx-auto  md:pt-14">
        <Card className="p-4 w-full self-center relative">
          <div>
            <div className="w-[200px] h-[200px] rounded-full bg-blue-600 -mt-20 mx-auto flex items-center justify-center flex-wrap relative">
              <h3 className="text-8xl font-bold text-white">V</h3>
            </div>
            <div className="p-5 flex items-center justify-center w-full">
              <Button className="mr-2 bg-transparent shadow-none text-black border border-black px-2 py-0">
                <Pen size={15} className="mr-2" /> Edit Profile
              </Button>
              <Button className="bg-transparent shadow-none text-black border border-black px-2 py-0 flex items-center">
                Delete
                <Trash color="red" size={15} className="ml-2" />
              </Button>
            </div>
            <h3 className="font-semibold text-2xl text-center">
              Vishvendra Singh
              <span className="text-xl inline-block text-black font-medium text-center">
                (Admin)
              </span>
            </h3>
            <div>
              <Form {...form}>
                <form className="space-y-8 w-full">
                  <div className="md:grid md:grid-cols-1 gap-8">
                    <FormField
                      name="agent_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Id</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter agent id"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter agent full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="user_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UserName</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter user name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter confirm password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      name="gst_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your GST"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      name="plans"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose a Plan</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a plan"
                                />
                                <SelectContent>
                                  <SelectItem value="basic">Basic</SelectItem>
                                  <SelectItem value="agent">Agent</SelectItem>
                                </SelectContent>
                              </SelectTrigger>
                            </FormControl>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
