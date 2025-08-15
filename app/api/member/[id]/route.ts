import { getMemberById } from '@/server/duesModel'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id

    const res = await getMemberById(Number(id))
    if (!res || res.length === 0) {
      throw new Error('Member not found')
    }
    return NextResponse.json(
      {
        data: res[0],
        success: true,
        message: `Member with ID ${id} fetched successfully`,
      },
      { status: 200 }
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    return NextResponse.json({ message }, { status: 404 })
  }
}
