import mongoose, {Schema} from "mongoose";

const riasecQuestions = new Schema(
    {
        id: String,
        arrangement: Number,
        question: String,
        question_ar: String,
        q_type: String,
    }
);

const RiasecQuestions = mongoose.models.RiasecQuestions || mongoose.model("RiasecQuestions", riasecQuestions);

export default RiasecQuestions;