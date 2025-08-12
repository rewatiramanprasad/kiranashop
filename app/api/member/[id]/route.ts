import { getMemberById } from "@/server/duesModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    console.log("logging from memberRoute",id)

    const res = await getMemberById(id);
    console.log(res)
    if (!res || res.length === 0) {
        return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
    }
    return NextResponse.json({ data: res[0], success: true, message: `Member with ID ${id} fetched successfully` }, { status: 200 });

    
}