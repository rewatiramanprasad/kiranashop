import React from 'react'
import { dummyData } from '@/dummyData.mjs'
import Container from '@/components/container'
import SearchAndList from '@/components/SearchAndList'

async function ListPage() {
  try {
    const res = await fetch('http://localhost:3000/api/list')
    const data = await res.json()
    if (data.success === false) {
      throw new Error(data.message || 'Failed to fetch list data')
    }

    return (
      <Container>
        <SearchAndList data={data.data} />
      </Container>
    )
  } catch (error) {
    console.error('Error fetching list data:', error)

    return (
      <h1 className=" text-2xl text-center text-red-500">
        {typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : 'An error occurred'}
      </h1>
    )
  }
}

export default ListPage
