'use client'

import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/validations/login.form.validation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Login({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      tenant_id: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data, 'data')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="tenant_id"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Tenant Id</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your tenant Id"
                    type="text"
                    className="rounded-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your email"
                    type="email"
                    className="rounded-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your password"
                    type="password"
                    className="rounded-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-black w-full rounded-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
