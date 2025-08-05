import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

function SearchInput() {
  return (
    <div className="bg-first w-full relative p-2">
      <Input
        type="text"
        placeholder="Search by name or number"
        className="w-full h-14 text-center mx-auto  p-2 border bg-third border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search
        size={36}
        color="#F4BB4A"
        className=" absolute inset-y-0 left-4 top-4 "
      />
    </div>
  )
}

export default SearchInput
