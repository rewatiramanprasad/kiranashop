import { getDuesList } from '@/server/duesModel'
import { NextResponse } from 'next/server'
// import {seeding} from '@/server/seeding'

export async function GET() {
  try {
    const data = await getDuesList()
    if (data.length === 0) {
      return NextResponse.json(
        { data: [], success: false, message: 'No dues found' },
        { status: 404 }
      )
    }
    if (!data) {
      throw new Error('failed to fetch dues data')
    }

    return NextResponse.json(
      {
        data: data,
        success: true,
        message: `${data.length} rows fetched successfully`,
      },
      { status: 200 }
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    return NextResponse.json(
      { data: [], success: false, message },
      { status: 500 }
    )
  }
}
