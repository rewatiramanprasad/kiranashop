import { getContact } from '@/server/duesModel'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getContact()
    if (!data) {
      throw new Error('Failed to fetch contacts data')
    }
    if (data.length === 0) {
      return NextResponse.json(
        { data: [], success: true, message: 'No contacts found' },
        { status: 200 }
      )
    }
    return NextResponse.json(
      {
        data: data,
        success: true,
        message: `${data.length} contacts fetched successfully`,
      },
      { status: 200 }
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { data: [], success: false, message },
      { status: 500 }
    )
  }
}
