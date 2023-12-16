import { Document, model, Schema } from "mongoose";
import { client } from "..";

interface Guild extends Document {
    guildId: string;
    avatar: string;
    name: string;
    tag: string;
    ownerId: string;
    reputation: number;
    guildType: "good" | "evil";
    createDate: Date;
    points: number;
    // contracts: Array<{
    //     name: string;
    // }>;
    level: {
        xpNow: number;
        xpNeed: number;
        now: number;
    };
    members: Array<{
        userId: string;
        contracts: number;
        reputation: number;
        joinDate: Date;
        status: number;
    }>;
    memberLimit: number;
    inventory: Array<{ name: string; price: number; expireAt: Date }>;
    fraction: string;
}

const Guild = model<Guild>(
    "guild",
    new Schema<Guild>({
        guildId: { type: String, required: true },
        avatar: { type: String, required: true },
        name: { type: String, required: true },
        tag: { type: String, required: true },
        ownerId: { type: String, required: true },
        reputation: { type: Number, required: true },
        guildType: { type: String, required: true },
        createDate: { type: Date, default: Date.now, required: true },
        points: { type: Number, required: true },
        level: {
            type: {
                xpNow: { type: Number, required: true },
                xpNeed: { type: Number, required: true },
                now: { type: Number, required: true },
            },
            required: true,
        },
        members: [
            {
                userId: { type: String, required: true },
                contracts: { type: Number, required: true, default: 0 },
                reputation: { type: Number, required: true, default: 0 },
                joinDate: { type: Date, required: true, default: Date.now },
                status: { type: Number, required: true, default: 1 },
            },
        ],
        memberLimit: { type: Number, required: true, default: 10 },
        inventory: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                expireAt: { type: Date, required: true, default: new Date() },
            },
        ],
        fraction: { type: String, required: true },
    }),
    "guilds",
    { connection: client?.db.connection }
);

export default Guild;
