import { Document, model, Schema } from "mongoose";
import { client } from "..";

interface LocalBan extends Document {
    userId: string;
    modId: string;
    reason: string;
}

const LocalBan = model<LocalBan>(
    "localban",
    new Schema({
        userId: { type: String, required: true },
        modId: { type: String, required: true },
        reason: { type: String, required: true },
    }),
    "localbans",
    { connection: client?.db.connection }
);

export default LocalBan;
