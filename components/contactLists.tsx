'use client'
import React, { useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import SearchInput from '@/components/search'
import { Phone } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setContacts } from '@/app/lib/contactSlice'
import { setContactSearchTerm } from '@/app/lib/FilterListSlice'
import { ContactFilterSelector } from '@/app/lib/FilterSelector'
import { ContactItem } from '@/server/action'

function ContactList({ data }: { data: ContactItem[] }) {
  const dispatch = useDispatch()
  const handleSearch = (str: string) => {
    dispatch(setContactSearchTerm(str))
  }
  const filterData = useSelector(ContactFilterSelector)
  useEffect(() => {
    dispatch(setContacts(data))
  }, [data, dispatch])
  return (
    <div className="flex flex-col items-center">
      <SearchInput handleSearch={handleSearch} />
      <List
        height={700}
        itemCount={filterData.length}
        itemSize={76 + 8}
        width={'100%'}
        itemData={filterData}
        className="mb-2 p-4 bg-first rounded shadow"
      >
        {({ index, style }) => {
          const item = filterData[index]

          return (
            <ContactListItem
              name={item.name}
              mobile={item.mobile}
              style={style}
            />
          )
        }}
      </List>
    </div>
  )
}
export default ContactList

function ContactListItem({
  name,
  mobile,
  style,
}: {
  name: string
  mobile: number
  style: React.CSSProperties
}) {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const handleLongPressStart = () => {
    timerRef.current = setTimeout(() => {
      navigator.clipboard.writeText(String(mobile))
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
      className="p-2 border-y-8  border-first bg-third  flex flex-cols gap-4  justify-center items-center"
    >
      {name.length >= 16 ? (
        <h2 className="text-lg w-36 font-semibold">{name.slice(0, 13)}...</h2>
      ) : (
        <h2 className="text-lg w-36 font-semibold">{name}</h2>
      )}
      <p className="text-m  text-gray-600">{mobile}</p>
      <Phone />
    </div>
  )
}
