import Container from '@/components/container'
import CustomerDetails from '@/components/customerDetail'
import { CustDetailsAction, CustDetailsActionResponse } from '@/server/action'
import React from 'react'


async function CustDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    
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
          Error:
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </h1>
      </Container>
    )
  }
}

export default CustDetails
