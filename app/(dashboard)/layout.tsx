'use client'
import Header from '@/components/header'
import Sidebar from '@/components/sideBar'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col ml-60">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div>{children}</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
