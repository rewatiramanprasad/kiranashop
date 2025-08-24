import Container from '@/components/container'
import CustomerDetails from '@/components/customerDetail'
import { CustDetailsAction, CustDetailsActionResponse } from '@/server/action'
import React from 'react'





async function CustDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log('logging from cutDetails ', id)
  try {
    // const res: Response = await fetch(`http://localhost:3000/api/list/${id}`)
    // const data: ListDataResponse = await res.json()
    // const userData: Response = await fetch(
    //   `http://localhost:3000/api/member/${id}`
    // )
    // const memberData: MemberDataResponse = await userData.json()
    // if (data.success === false || memberData.success === false) {
    //   if (data.success === false) {
    //     throw new Error(data.message)
    //   }
    //   if (memberData.success === false) {
    //     throw new Error(memberData.message)
    //   }
    // }
    const data: CustDetailsActionResponse = await CustDetailsAction(id) 

    return (
      <Container>
        <CustomerDetails data={ data} />
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
