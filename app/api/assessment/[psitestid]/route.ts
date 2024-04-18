import PsiAnswers from "@/lib/models/psiAnswers";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    psitestid: string
}
  
export async function POST(req: NextRequest, context: { params: Params }) {
    const psiTestId = context.params.psitestid;

    const { arrangement, B, C, I, A } = await req.json();
    
    await connectMongoDB();
    
    await PsiAnswers.create({ psiTestId, arrangement, B, C, I, A });
    
    return NextResponse.json({ message: "Answer submitted" }, { status: 201 });
}

export async function GET(){
    await connectMongoDB();
    const psiTest = await PsiAnswers.find();
    return NextResponse.json({psiTest})
}