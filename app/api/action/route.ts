import { fetchAllMembersData } from '@/server/duesModel'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const memberData = await fetchAllMembersData()
    if (memberData.length === 0) {
      return NextResponse.json(
        { data: [], success: true, message: 'No members found' },
        { status: 200 }
      )
    }
    if (!memberData) {
      throw new Error('Failed to fetch members data')
    }

    return NextResponse.json({
      data: memberData,
      message: ` Fetched ${memberData.length} rows successfully`,
      success: true,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching members:', error)
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
