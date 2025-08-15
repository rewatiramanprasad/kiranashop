import React from 'react'
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
