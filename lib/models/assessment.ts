import mongoose, {Schema} from "mongoose";

const assessmentSchema = new Schema(
    {
        id: String,
        userId: String,
        psiTestId: String,
        psiReportId: String,
        riasecTestId: String,
        riasecReportId: String,
        cvTestId: String,
        cvReportId: String,
        msTestId: String,
        msReportId: String,
    },
    {timestamps: true},
);

const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;