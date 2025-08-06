'use client'
import React from 'react'
import { FixedSizeList as List } from 'react-window'
import SearchInput from '@/components/search'
import { Phone } from 'lucide-react'
import { toast } from 'sonner'

function ContactList({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col items-center">
      <SearchInput />
      <List
        height={700}
        itemCount={data.length}
        itemSize={76 + 8}
        width={'100%'}
        itemData={data}
        className="mb-2 p-4 bg-white rounded shadow"
      >
        {({ index, style }) => {
          const item = data[index]

          return (
            <ContactItem name={item.name} mobile={item.mobile} style={style} />
          )
        }}
      </List>
    </div>
  )
}

function ContactItem({
  name,
  mobile,
  style,
}: {
  name: string
  mobile: string
  style: React.CSSProperties
}) {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const handleLongPressStart = () => {
    timerRef.current = setTimeout(() => {
      navigator.clipboard.writeText(mobile)
      toast.info('Phone number copied to clipboard')
    }, 600)
  }
  const handleLongPressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }
  return (
    <div
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      style={style}
      key={mobile}
      className="p-2 border-y-8  border-first bg-third flex flex-row justify-between items-center"
    >
      {/* <div className="flex flex-col justify-center items-start  gap-2"> */}
      <h2 className="text-lg font-semibold">{name}</h2>
      {/* </div> */}
      <p className="text-m text-gray-600">{mobile}</p>
      <Phone />
    </div>
  )
}

export default ContactList
