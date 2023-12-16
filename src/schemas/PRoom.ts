import { model, Schema, Document } from "mongoose";
import { client } from "..";

interface PRoomInterface extends Document {
    roomId: string;
    ownerId: string;
}

const PRoom = model<PRoomInterface>(
    "proom",
    new Schema({
        roomId: { type: String, required: true },
        ownerId: { type: String, required: true },
    }),
    "prooms",
    { connection: client?.db.connection }
);

export default PRoom;
