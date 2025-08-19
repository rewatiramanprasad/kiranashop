import React from 'react'
import Container from '@/components/container'
import SearchAndList from '@/components/searchAndLists'
export type ListItem = {
  name: string
  mobile: string
  member_id: string
  updateAt: Date
  amount: number
}
type ListResponse = {
  data: ListItem[],
  success: boolean,
  message:string
}
async function ListPage() {
  try {
    const res:Response = await fetch('http://localhost:3000/api/list')
    const data:ListResponse = await res.json()
    console.log("logging from listPage",data)
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
