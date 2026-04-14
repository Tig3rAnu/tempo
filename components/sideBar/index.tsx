import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { XCircle } from 'lucide-react'

import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  Landmark,
  LibraryBig,
  Globe,
  UserRound,
  AppWindow,
  Sliders,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (args: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname()

  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  // let storedSidebarExpanded = 'true'
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  // )
  const routes = [
    {
      href: '/overview',
      label: 'Overview',
      active: pathname === '/overview',
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: '/students',
      label: 'Students',
      active: pathname === '/students',
      icon: <GraduationCap size={20} />,
    },
    {
      href: '/payments',
      label: 'Payments',
      active: pathname === '/payments',
      icon: <CreditCard size={20} />,
    },
    {
      href: '/universities',
      label: 'Universities',
      active: pathname === '/universities',
      icon: <Landmark size={20} />,
    },
    {
      href: '/courses',
      label: 'Courses',
      active: pathname === '/courses',
      icon: <LibraryBig size={20} />,
    },
    {
      href: '/countries',
      label: 'Countries',
      active: pathname === '/countries',
      icon: <Globe size={20} />,
    },
    {
      href: '/agents',
      label: 'Agents',
      active: pathname === '/agents',
      icon: <UserRound size={20} />,
    },
    {
      href: '/applications',
      label: 'Applications',
      active: pathname === '/applications',
      icon: <AppWindow size={20} />,
    },
    {
      href: '/settings',
      label: 'Settings',
      active: pathname === '/settings',
      icon: <Sliders size={20} />,
    },
  ]

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  // useEffect(() => {
  //   localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
  //   if (sidebarExpanded) {
  //     document.querySelector('body')?.classList.add('sidebar-expanded')
  //   } else {
  //     document.querySelector('body')?.classList.remove('sidebar-expanded')
  //   }
  // }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`fixed  w-60 left-0 sm:top-12 md:top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#FFE49B] dark:bg-[#000] duration-300 ease-linear dark:bg-boxdark lg:fixed lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="block lg:hidden self-end p-2"
      >
        <XCircle />
      </button>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="bg-white w-28 h-28 mx-auto text-center rounded-full relative mb-8 shadow-xl mt-7">
          <Link href="/">
            <Image
              src='/admin/img/logo.png'
              width={100}
              height={100}
              className="mx-auto absolute top-2/4 translate-y-[-50%] left-0 right-0 w-auto h-auto"
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <div className="no-scrollbar flex overflow-y-auto flex-col duration-300 ease-linear">
        <nav className="p-4 pt-0">
          <ul className="w-full py-2 ml-4 ">
            {routes.map((route) => (
              <li
                key={route.href}
                className={cn(
                  'py-2 my-1 px-4 rounded-l-3xl',
                  route.active ? 'bg-white dark:bg-[#FFB600]' : ''
                )}
              >
                <Link
                  href={route.href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-black hover:dark:text-white flex items-center self-center',
                    route.active
                      ? 'text-black dark:text-black hover:dark:text-black'
                      : 'text-muted-forground'
                  )}
                >
                  <span className="pr-2 text-sm">{route.icon}</span>
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
