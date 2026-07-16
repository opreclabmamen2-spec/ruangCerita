import mongoose from "mongoose";
import { nanoid } from "nanoid";

const faqSchema = new mongoose.Schema(
    {
        faqId: {
                type: String,
                default: () => nanoid(10),
                unique: true,
                required: true
            },
        question: {
            type: String,
            require: true,
        },
        answer: {
            type: String,
            require: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
)

const faqModel = mongoose.model.faq||mongoose.model('faq', faqSchema);

export default faqModel;