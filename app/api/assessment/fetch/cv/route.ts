import CvQuestions from "@/lib/models/cvQuestions";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const arrangement = req.nextUrl.searchParams.get("arrangement");
    await connectMongoDB();
    const question = await CvQuestions.findOne({ arrangement });
    return NextResponse.json({question})
}

export async function POST(req: NextRequest){
    const { arrangement, question, question_ar, description, description_ar } = await req.json();
    await connectMongoDB();
    await CvQuestions.create({ arrangement, question, question_ar, description, description_ar });
    return NextResponse.json({ message: "Answer submitted" }, { status: 201 });
}