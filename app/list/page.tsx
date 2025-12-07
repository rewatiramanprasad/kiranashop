import React from 'react'
import Container from '@/components/container'
import SearchAndList from '@/components/searchAndLists'
import { getDuesList } from '@/server/duesModel'

export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'

async function ListPage() {
  let data: Awaited<ReturnType<typeof getDuesList>> | null = null
  let errorMessage: string | null = null

  try {
    data = await getDuesList()
    if (!data || data.length === 0) {
      throw new Error('Failed to fetch list data')
    }
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'
  }

  if (errorMessage) {
    return (
      <Container>
        <div className="text-red-500">
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <SearchAndList data={data!} />
    </Container>
  )
}

export default ListPage
