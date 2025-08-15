import Container from '@/components/container'
import CustomerDetails from '@/components/customerDetail'
import React from 'react'

async function CustDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const res = await fetch(`http://localhost:3000/api/list/${id}`)
    const data = await res.json()
    const userData = await fetch(`http://localhost:3000/api/member/${id}`)
    const memberData = await userData.json()
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
        <CustomerDetails listData={data.data} userData={memberData} />
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
