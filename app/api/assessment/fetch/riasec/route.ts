import RiasecQuestions from "@/lib/models/riasecQuestions";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const arrangement = req.nextUrl.searchParams.get("arrangement");
    await connectMongoDB();
    const question = await RiasecQuestions.findOne({ arrangement });
    return NextResponse.json({question})
}

export async function POST(req: NextRequest){
    const { arrangement, question, question_ar, q_type, img_url } = await req.json();
    await connectMongoDB();
    await RiasecQuestions.create({ arrangement, question, question_ar, q_type, img_url });
    return NextResponse.json({ message: "Answer submitted" }, { status: 201 });
}
