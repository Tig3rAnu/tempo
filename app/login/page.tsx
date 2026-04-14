import { Metadata } from 'next'
import Image from 'next/image'
import { Login } from '@/components/login/Login'
import { Kanit } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to siksha portal',
}
const kanit = Kanit({
  subsets: ['latin'],
  weight: '700',
})

export default function AuthenticationPage() {
  return (
    <div className="flex flex-wrap justify-center self-center drop-shadow-2xl rounded-2xl bg-white w-[500px]">
      <div className="flex justify-between w-full">
        <div className="p-8 self-center w-full flex justify-center flex-wrap">
          <div className="flex flex-col space-y-2 text-center w-full pb-6">
            <h1
              className={`${kanit.className} text-5xl font-semibold tracking-tight`}
            >
              Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Unlock Global Opportunities: Your Gateway to Study Abroad!
            </p>
          </div>
          <div className="login-round-box flex justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[250px]">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
