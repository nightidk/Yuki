import { model, Schema, Document } from "mongoose";
import { client } from "..";

interface LunixInterface extends Document {
    BETA_USERS: Array<string>;
    DEVELOPERS: Array<string>;
    STORY_SERVER: string;
    RUNNED_COMMANDS: number;
}

const Lunix = model<LunixInterface>(
    "lunix",
    new Schema<LunixInterface>({
        BETA_USERS: { type: [{ type: String }], required: true },
        DEVELOPERS: { type: [{ type: String }], required: true },
        STORY_SERVER: { type: String, required: true },
        RUNNED_COMMANDS: { type: Number, required: true },
    }),
    "lunix",
    { connection: client?.db.connection }
);

export default Lunix;
