import Container from '@/components/container'
import CustomerDetails from '@/components/customerDetail'
import React from 'react'
export interface dueItem {
  id: string
  member_id: string
  amount: number
  remarks?: string
  is_paid: boolean
  dues_type: string
  createdAt?: string
  updatedAt?: string
}

export interface TotalItem {
  remaindues: number
}

export interface ListData {
  dueData: dueItem[]
  remainDues: TotalItem
}

export interface ListDataResponse {
  data: ListData
  success: boolean
  message: string
}

export interface MemberDataResponse {
  data: MemberItem
  success: boolean
  message: string
}
export interface MemberItem {
  id: string
  name: string
  mobile: string
}

async function CustDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const res: Response = await fetch(`http://localhost:3000/api/list/${id}`)
    const data: ListDataResponse = await res.json()
    const userData: Response = await fetch(
      `http://localhost:3000/api/member/${id}`
    )
    const memberData: MemberDataResponse = await userData.json()
    if (data.success === false || memberData.success === false) {
      if (data.success === false) {
        throw new Error(data.message)
      }
      if (memberData.success === false) {
        throw new Error(memberData.message)
      }
    }

    return (
      <Container>
        <CustomerDetails listData={data.data} userData={memberData.data} />
      </Container>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return (
      <Container>
        <h1 className="text-2xl font-bold text-red-500">
          Error:{' '}
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </h1>
      </Container>
    )
  }
}

export default CustDetails
