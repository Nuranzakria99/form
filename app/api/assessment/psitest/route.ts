import Assessment from "@/lib/models/assessment";
import PsiTest from "@/lib/models/psiTest";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const assessmentId = req.nextUrl.searchParams.get("assessmentId");
  if (!assessmentId) {
    return new Response(JSON.stringify({ error: "Assessment ID is required." }), { status: 400 });
  }
  await connectMongoDB();

  let psi = await PsiTest.findOne({ assessmentId: assessmentId });
  if (!psi) {
    psi = await PsiTest.create({ assessmentId: assessmentId });
    await Assessment.findByIdAndUpdate(assessmentId, { psiTestId: psi._id });
  }

  return NextResponse.json({ redirectId: psi._id.toString() }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
        return new Response('Bad request', {status: 400});
      }

      try {
        await connectMongoDB();
        let assessmentId = (await PsiTest.findOne({_id: id})).assessmentId;
        await Assessment.findByIdAndUpdate(assessmentId, {$unset: {"psiTestId": ""}});
        
        await PsiTest.findByIdAndDelete(id);
        return NextResponse.json({message: "Assessment deleted Successfully"}, {status: 200});
      } catch (err){
        console.log(err)
      }
}