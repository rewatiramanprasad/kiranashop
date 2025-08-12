const data = [
  { name: 'Home', path: '/dashboard', icon: <House color="#F4BB4A" size={36} /> },
  { name: 'list', path: '/list', icon: <List color="#F4BB4A" size={36} /> },
  {
    name: 'Customer',
    path: '/addCustomer',
    icon: <Users color="#F4BB4A" size={48} strokeWidth={3} />,
  },
  { name: 'Dues', path: '/addDues', icon: <Plus color="#F4BB4A" size={36} /> },
  {
    name: 'Contact',
    path: '/contact',
    icon: <Contact color="#F4BB4A" size={36} />,
  },
]

import Link from 'next/link'
import React from 'react'
import { House, List, Users, Plus, Contact } from 'lucide-react'

function Navigation() {
  return (
    <div className="bg-first max-w-[360px] w-full mx-auto flex h-12 px-4  gap-8 justify-center items-center fixed bottom-0 rounded ">
      {data.map((item) => {
        return (
          <Link key={item.name} href={item.path}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Navigation
