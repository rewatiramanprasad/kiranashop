import React from 'react'
import { dummyData } from '@/dummyData.mjs'
import Container from '@/components/container'
import SearchAndList from '@/components/List'
async function ListPage() {
  const res = await fetch('http://localhost:3000/api/list')
  const data = await res.json()
  console.log(data)

  return (
    // <div className="bg-first flex flex-col items-center">
    // </div>
    <Container>
      <SearchAndList data={data.data} />
    </Container>
  )
}

export default ListPage
