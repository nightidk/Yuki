import { model, Schema, Document } from "mongoose";
import { client } from "..";

interface StoryInterface extends Document {
    userId: string;
    chapter: string;
    storyPage: number;
    points: number;
}

const Story = model<StoryInterface>(
    "story",
    new Schema({
        userId: { type: String, required: true },
        chapter: { default: "main", type: String, required: true },
        storyPage: { default: 0, type: Number, required: true },
        points: { default: 0, type: Number, required: true },
    }),
    "stories",
    { connection: client?.db.connection }
);

export default Story;
