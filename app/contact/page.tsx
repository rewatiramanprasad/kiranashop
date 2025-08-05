'use client'
import React from 'react'
import { dummyData } from '@/dummyData.mjs'
import { FixedSizeList as List } from 'react-window'
import SearchInput from '@/components/search'
function ContactPage() {
  if (!dummyData || dummyData.length === 0) {
    return <h1 className="text-center mt-8">No data available</h1>
  }
  return (
    <div className="bg-first flex flex-col items-center">
      <SearchInput />
      <List
        height={675}
        itemCount={dummyData.length}
        itemSize={76 + 8}
        width={'95%'}
        itemData={dummyData}
        
      >
        {({ index, style }) => {
          const item = dummyData[index]

          return (
            <div
              style={style}
              key={item.id}
              className="p-4 border-y-8  border-first bg-third flex flex-row justify-between items-center"
            >
              {/* <div className="flex flex-col justify-center items-start  gap-2"> */}
              <h2 className="text-lg font-semibold">{item.full_name}</h2>
              {/* </div> */}
              <p className="text-lg text-gray-600">{item.mobile}</p>
            </div>
          )
        }}
      </List>
    </div>
  )
}

export default ContactPage
