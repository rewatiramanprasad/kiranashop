import { createDues, Dues } from '@/server/duesModel'
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, Amount, Remarks } = body

    await createDues({
      member_id: id,
      amount: parseFloat(Amount),
      is_paid: false,
      dues_type: 'dues',
      remarks: Remarks,
    } as Dues)

    return new Response(JSON.stringify({ success: true, data: body }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
