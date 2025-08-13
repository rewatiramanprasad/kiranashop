import { fetchAllMembersData } from "@/server/duesModel"
import { NextResponse } from "next/server"
import { success } from "zod"


export async function GET() {

    const memberData = await fetchAllMembersData()
    if(!memberData) {
        return NextResponse.json({data:[],success:false, message: 'No members found' }, { status: 404 })
    }

    return NextResponse.json({
        data: memberData,
        message: ` Fetched ${memberData.length} rows successfully`,
        success: true
    })
 }