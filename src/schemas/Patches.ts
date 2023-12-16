import { model, Schema, Document } from "mongoose";
import { client } from "..";

interface PatchInterface extends Document {
    version: string;
    name: string;
    notes: Array<string>;
    image: string;
    activeNow: boolean;
}

const Patch = model<PatchInterface>(
    "patch",
    new Schema<PatchInterface>({
        version: { type: String, required: true },
        name: { type: String, required: true },
        notes: { type: [String], required: true },
        image: { type: String, required: true },
        activeNow: { type: Boolean, default: true, required: true },
    }),
    "patches",
    { connection: client?.db.connection }
);

export default Patch;
