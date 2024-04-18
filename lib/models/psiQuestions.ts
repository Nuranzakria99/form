import mongoose, {Schema} from "mongoose";

const psiQuestions = new Schema(
    {
        id: String,
        arrangement: Number,
        behavioral: String,
        cognitive: String,
        interpersonal: String,
        affective: String,
        behavioral_ar: String,
        cognitive_ar: String,
        interpersonal_ar: String,
        affective_ar: String,
    }
);

const PsiQuestions = mongoose.models.PsiQuestions || mongoose.model("PsiQuestions", psiQuestions);

export default PsiQuestions;