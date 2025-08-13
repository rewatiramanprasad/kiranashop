import { createPayment, Dues } from '@/server/duesModel'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received data in add payment routes:', body)
    // Validate the data if necessary
    // const parsedData = formSchema.parse(body);
    const { id, Amount, Remarks } = body
    await createPayment({
      member_id: id,
      amount: parseFloat(Amount),
      is_paid: false,
      dues_type: 'payment',
      remarks: Remarks || null,
    } as Dues)
    // Here you would typically process the data, e.g., save it to a database
    // For demonstration, we will just return the received data
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
