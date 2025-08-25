import React from 'react'
import Container from '@/components/container'
import SearchAndList from '@/components/searchAndLists'
import { getDuesList } from '@/server/duesModel'

async function ListPage() {
  try {
    const data = await getDuesList()
    if (data.length === 0) {
      throw new Error('Failed to fetch list data')
    }

    return (
      <Container>
        <SearchAndList data={data} />
      </Container>
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    return (
      <Container>
        <div className="text-red-500">
          <h1>Error</h1>
          <p>{message}</p>
        </div>
      </Container>
    )
  }
}

export default ListPage
