'use client'
import React, { useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import SearchInput from '@/components/search'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setList } from '@/app/lib/ListSlice'
import { setSearchTerm } from '@/app/lib/FilterListSlice'
import { SearchFilterSelector } from '@/app/lib/FilterSelector'
import { ListItem } from '@/app/list/page'

function SearchAndList({ data }: { data: ListItem[] }) {
  const dispatch = useDispatch()
  //we can use useSelector to get the data from the store, but here we are passing it as a prop
  const handleSearch = (str: string) => {
    dispatch(setSearchTerm(str))
  }

  const filterData = useSelector(SearchFilterSelector)

  useEffect(() => {
    dispatch(setList(data))
    // dispatch()
  }, [data, dispatch])
  return (
    <div className="flex flex-col items-center">
      <SearchInput handleSearch={handleSearch} />
      <List
        height={685}
        itemCount={filterData.length}
        itemSize={76 + 8}
        width={'95%'}
        itemData={filterData}
        className="mb-2 p-4 bg-first rounded shadow"
      >
        {({ index, style }) => {
          const item = filterData[index]

          return (
            <Link href={`/list/${item.member_id}`}>
              <div
                style={style}
                key={item.member_id}
                className="p-4 border-y-8  border-first bg-third flex flex-row justify-between items-center"
              >
                <div className="flex flex-col justify-center items-start  gap-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.mobile}</p>
                </div>
                <p className="text-xl text-gray-600">{item.amount}</p>
              </div>
            </Link>
          )
        }}
      </List>
    </div>
  )
}

export default SearchAndList
