import { getContact } from "@/server/duesModel"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await getContact()
    if(!data) {
        return NextResponse.json({ data: [], success: false, message: "Something went wrong!" }, { status: 404 })
    }
    if(data.length === 0) {
        return NextResponse.json({ data: [], success: false, message: "No contacts found" }, { status: 404 })
    }
  return NextResponse.json({ data: data, success: true, message: `${data.length} contacts fetched successfully` }, { status: 200 })
}