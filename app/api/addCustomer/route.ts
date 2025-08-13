import { createCustomer } from '@/server/duesModel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Received data:', body)
  const res = await createCustomer({
    name: body.Name,
    mobile: body.Mobile,
    amount: body.Amount,
    remarks: body.Remarks,
  })
  if (!res) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add customer',
      },
      { status: 500 }
    )
  }
  return NextResponse.json(
    {
      data: [body],
      success: true,
      message: 'Customer added successfully',
    },
    { status: 201 }
  )
}
