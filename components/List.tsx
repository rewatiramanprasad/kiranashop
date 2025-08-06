'use client'
import React from 'react'
import { FixedSizeList as List } from 'react-window'
import SearchInput from '@/components/search'

function SearchAndList({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col items-center">
      <SearchInput />
      <List
        height={685}
        itemCount={data.length}
        itemSize={76 + 8}
        width={'95%'}
        itemData={data}
        className="mb-2 p-4 bg-white rounded shadow"
      >
        {({ index, style }) => {
          const item = data[index]

          return (
            <div
              style={style}
              key={item.id}
              className="p-4 border-y-8  border-first bg-third flex flex-row justify-between items-center"
            >
              <div className="flex flex-col justify-center items-start  gap-2">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.mobile}</p>
              </div>
              <p className="text-xl text-gray-600">{item.amount}</p>
            </div>
          )
        }}
      </List>
    </div>
  )
}

export default SearchAndList
