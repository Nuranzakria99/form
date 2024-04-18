import mongoose, {Schema} from "mongoose";

const cvQuestions = new Schema(
    {
        id: String,
        arrangement: Number,
        question: String,
        question_ar: String,
        description: String,
        description_ar: String,
    }
);

const CvQuestions = mongoose.models.CvQuestions || mongoose.model("CvQuestions", cvQuestions);

export default CvQuestions;