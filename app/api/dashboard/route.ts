import { maxDues, minDues, totalDues } from '@/server/duesModel'
import { NextResponse } from 'next/server'


export async function GET() {
  try {
    const max = await maxDues()
    const min = await minDues()
    const total = await totalDues()
    const data = {
      maxDues: max[0].name,
      minDues: min[0].name,
      total: total.rows[0].totaldues,
    }
    return NextResponse.json({
      data: data,
      success: true,
      message: 'data fetch successfully',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error fetching dues data:', error)
    return NextResponse.json({ data:[],success:false,message:message }, { status: 500 })
  }
}
