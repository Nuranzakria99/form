import Assessment from "@/lib/models/assessment";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {userId} = await req.json();
    await connectMongoDB();
    await Assessment.create({userId});
    return NextResponse.json({message: "Assessment created"}, { status: 201})
} 

export async function GET() {
    await connectMongoDB();
    const assessments = await Assessment.find();
    return NextResponse.json({assessments})
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
        return new Response('Bad request', {status: 400});
      }
      
      try {
        await connectMongoDB();
        await Assessment.findByIdAndDelete(id);
        return NextResponse.json({message: "Assessment deleted Successfully"}, {status: 200});
      } catch (err){
        console.log(err)
      }
}