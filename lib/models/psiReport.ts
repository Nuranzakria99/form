import mongoose, {Schema} from "mongoose";

const psiReport = new Schema(
    {
        id: String,
        psiTestId: String,
        B: Number,
        C: Number,
        I: Number,
        A: Number,
        result: String,
    },
    {timestamps: true},
);

const PsiReport = mongoose.models.PsiReport || mongoose.model("PsiReport", psiReport);

export default PsiReport;