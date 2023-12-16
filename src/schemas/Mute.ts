import { Document, model, Schema } from "mongoose";
import { client } from "..";

interface Mute extends Document {
    userId: string;
    modId: string;
    reason: string;
    timestampEnd: number;
}

const Mute = model<Mute>(
    "mute",
    new Schema({
        userId: { type: String, required: true },
        modId: { type: String, required: true },
        reason: { type: String, required: true },
        timestampEnd: { type: Number, required: true },
    }),
    "mutes",
    { connection: client?.db.connection }
);

export default Mute;
