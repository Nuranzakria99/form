import mongoose, {Schema} from "mongoose";

const psiAnswers = new Schema(
    {
        id: String,
        psiTestId: String,
        arrangement: String,
        B: Number,
        C: Number,
        I: Number,
        A: Number,
    }
);

const PsiAnswers = mongoose.models.PsiAnswers || mongoose.model("PsiAnswers", psiAnswers);

export default PsiAnswers;