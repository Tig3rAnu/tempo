import { Input } from '../ui/input'
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[400px] bg-white rounded-full"
      />
      <div className="absolute right-4 top-2">
        <Search size={20} className="dark:bg-white" />
      </div>
    </div>
  )
}
