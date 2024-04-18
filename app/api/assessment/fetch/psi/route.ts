import PsiAnswers from "@/lib/models/psiAnswers";
import PsiQuestions from "@/lib/models/psiQuestions";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const arrangement = req.nextUrl.searchParams.get("arrangement");
    await connectMongoDB();
    const question = await PsiQuestions.findOne({ arrangement });
    return NextResponse.json({question})
}

// export async function POST(req: NextRequest){
//     const { arrangement, behavioral, cognitive, interpersonal, affective, behavioral_ar, cognitive_ar, interpersonal_ar, affective_ar } = await req.json();
//     await connectMongoDB();
//     await PsiQuestions.create({ arrangement, behavioral, cognitive, interpersonal, affective, behavioral_ar, cognitive_ar, interpersonal_ar, affective_ar });
//     return NextResponse.json({ message: "Answer submitted" }, { status: 201 });
// }