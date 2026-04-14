'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Login({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isMobileLogin, setIsMobileLogin] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="p-4">
      <div className="text-sm text-center py-4 mb-4">
        <p className="text-black text-2xl font-bold">Login</p>
        Unlock Global Opportunities: Your Gateway to Study Abroad!
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {!isMobileLogin ? (
            <div className="grid">
              <div className="grid gap-1 pb-4">
                <Label htmlFor="userName" className="mb-2">
                  User Name
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userName"
                  placeholder="Please enter your user name"
                  type="text"
                  className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
                  autoCapitalize="none"
                  autoComplete="userName"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1 pb-4">
                <Label htmlFor="password" className="mb-2">
                  Password
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="password"
                  className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Link href="" className="mt-1 text-xs block text-right">
                  Forgot Password?
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid">
              <div className="grid gap-1 pb-4">
                <Label htmlFor="mobile_number" className="mb-2">
                  Mobile Number
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile_number"
                  placeholder="Enter registered mobile number"
                  type="text"
                  className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent"
                  autoCapitalize="none"
                  autoComplete="mobile_number"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1 pb-4">
                <Label htmlFor="otp" className="mb-2">
                  Enter OTP
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="top"
                  placeholder="enter otp"
                  type="text"
                  className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent"
                  autoCapitalize="none"
                  autoComplete="otp"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Link href="" className="mt-1 text-xs block text-right">
                  Forgot Password?
                </Link>
              </div>
            </div>
          )}
          <Button
            disabled={isLoading}
            className="hover:bg-black text-xl rounded-full"
          >
            Login
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Button
          className="bg-trnasparent text-center border-none p-0 mt-1 hover:bg-transparent text-black text-sm relative"
          onClick={() => setIsMobileLogin(!isMobileLogin)}
        >
          {isMobileLogin ? 'Login with user name' : 'Login With OTP'}
        </Button>
      </div>
    </div>
  );
}
