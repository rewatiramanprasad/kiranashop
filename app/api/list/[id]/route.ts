import { getDuesById, getTotalAmountById } from "@/server/duesModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) { 
    
    const { id } =await  params;
    // Assuming you have a function to get dues by ID
    const data = await getDuesById(parseInt(id)); // Replace with actual function to fetch dues by ID
    const totalAmount= await getTotalAmountById(parseInt(id));
    console.log("logging from remainAmount",totalAmount)// Replace with actual function to fetch total amount by ID
    if (!data) {
        return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
    }

    const remainDues = (totalAmount[0] as { remainDues?: number })?.remainDues ?? 0;
    return NextResponse.json({ data: { remainDues, data }, success: true, message: ` ${data.length} rows fetched successfully` }, { status: 200 });    
}