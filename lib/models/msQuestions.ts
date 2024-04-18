import mongoose, {Schema} from "mongoose";

const msQuestions = new Schema(
    {
        id: String,
        arrangement: Number,
        question: String,
        question_ar: String,
        description: String,
        description_ar: String,
    }
);

const MsQuestions = mongoose.models.MsQuestions || mongoose.model("MsQuestions", msQuestions);

export default MsQuestions;