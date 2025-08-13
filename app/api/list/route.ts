import { getDuesList } from '@/server/duesModel'
import { NextResponse } from 'next/server'
// import {seeding} from '@/server/seeding'

export async function GET() {
  const data = await getDuesList()
  // await seeding()

  return NextResponse.json(
    {
      data: data,
      success: true,
      message: `${data.length} rows fetched successfully`,
    },
    { status: 200 }
  )
}
