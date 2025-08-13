import { maxDues,minDues,totalDues } from "@/server/duesModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() { 

    const max = await maxDues()
    const min = await minDues()
    const total=await totalDues()
    const data = {
        maxDues: max[0].name,
        minDues: min[0].name,
        total: total[0].totalDues
    }
    return NextResponse.json({ data: data,success:true, message:"data fetch successfully" })
}