import { createCustomer } from "@/server/duesModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) { 
    
    const body = await request.json();
    console.log("logging body from route.ts",body)
    const res = await createCustomer(body);
    console.log("logging res from route.ts",res)
    return NextResponse.json({
        data: [body],
        success:true,
        message: "Customer added successfully"},{status: 201});
}