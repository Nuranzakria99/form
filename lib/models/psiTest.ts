import mongoose, {Schema} from "mongoose";

const psiTestSchema = new Schema(
    {
        id: String,
        assessmentId: String,
    },
    {timestamps: true},
);

const PsiTest = mongoose.models.PsiTest || mongoose.model("PsiTest", psiTestSchema);

export default PsiTest;