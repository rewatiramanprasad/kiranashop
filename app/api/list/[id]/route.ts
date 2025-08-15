import { getDuesById, getTotalAmountById } from '@/server/duesModel'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const paramRes = await params
    const id = paramRes.id

    if (!id) {
      throw new Error('ID parameter is required')
    }
    const dueData = await getDuesById(id)
    const totalAmount = await getTotalAmountById(id)
    if (!dueData) {
      throw new Error('Something went wrong while fetching dues data')
    }
    const data = { dueData, totalAmount }
    return NextResponse.json(
      {
        data: data,
        success: true,
        message: `${dueData.length} rows fetched successfully`,
      },
      { status: 200 }
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    return NextResponse.json(
      { data: [], success: false, message: message },
      { status: 400 }
    )
  }
}
