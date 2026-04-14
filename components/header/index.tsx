import { SearchBar } from '../searchBar/searchbar'
import { ModeToggle } from './darkModeToggle/darkMode'
import DropdownNotification from './dropdownNotification'
import UserAvatar from './avatar/userAvatar'
import { Menu } from 'lucide-react'

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-gray-200 dark:bg-black drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-8">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className="z-99999 block rounded-sm border border-stroke bg-transparent p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Menu color="#000" />
          </button>
        </div>
        <div className="sm:block">
          <SearchBar />
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <ModeToggle />
            <DropdownNotification />
            <UserAvatar />
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
