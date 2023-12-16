import { Schema, model, Document } from "mongoose";
import { client } from "..";

export interface UserInterface extends Document {
    userId: string;
    balance: number;
    level: {
        now: number;
        xp: number;
    };
    marry: {
        married: boolean;
        partner?: string;
        marryDate?: Date;
        typeMarry?: string;
        tasks?: {
            name: string;
            description: string;
            done: boolean;
        }[];
    };
    stats: {
        voiceActive: {
            all: number;
            d7: {
                channels: Array<{ channelId: string; count: number }>;
                count: number;
            };
            d14: {
                channels: Array<{ channelId: string; count: number }>;
                count: number;
            };
        };
        chatActive: {
            all: number;
            d7: {
                channels: Array<{ channelId: string; count: number }>;
                count: number;
            };
            d14: {
                channels: Array<{ channelId: string; count: number }>;
                count: number;
            };
        };
    };
    guild: String;
    punishments: {
        type: string;
        time?: number;
        reason: string;
        modId: string;
        date: Date;
    }[];
}

const User = model<UserInterface>(
    "user",
    new Schema<UserInterface>({
        userId: { type: String, required: true },
        balance: {
            default: 14400,
            type: Number,
            required: true,
        },
        level: {
            default: {
                now: 1,
                xp: 240,
            },
            type: {
                now: { type: Number, required: true },
                xp: { type: Number, required: true },
            },
            required: true,
        },
        marry: {
            default: {
                married: false,
            },
            type: {
                married: { type: Boolean, required: true },
                partner: { type: String, required: false },
                marryDate: { type: Date, required: false },
                typeMarry: { type: String, required: false },
                tasks: {
                    type: [
                        {
                            name: { type: String, required: true },
                            description: { type: String, required: true },
                            done: {
                                type: Boolean,
                                required: true,
                                default: false,
                            },
                        },
                    ],
                    required: false,
                },
            },
            required: true,
        },
        stats: {
            default: {
                voiceActive: {
                    all: 0,
                    d7: { channels: [], count: 0 },
                    d14: { channels: [], count: 0 },
                },
                chatActive: {
                    all: 0,
                    d7: { channels: [], count: 0 },
                    d14: { channels: [], count: 0 },
                },
            },
            type: {
                voiceActive: {
                    type: {
                        all: { type: Number, required: true },
                        d7: {
                            type: {
                                channels: [
                                    { channelId: String, count: Number },
                                ],
                                count: { type: Number, required: true },
                            },
                            required: true,
                        },
                        d14: {
                            type: {
                                channels: [
                                    { channelId: String, count: Number },
                                ],
                                count: { type: Number, required: true },
                            },
                            required: true,
                        },
                    },
                    required: true,
                },
                chatActive: {
                    type: {
                        all: { type: Number, required: true },
                        d7: {
                            type: {
                                channels: [
                                    { channelId: String, count: Number },
                                ],
                                count: { type: Number, required: true },
                            },
                            required: true,
                        },
                        d14: {
                            type: {
                                channels: [
                                    { channelId: String, count: Number },
                                ],
                                count: { type: Number, required: true },
                            },
                            required: true,
                        },
                    },
                    required: true,
                },
            },
            required: true,
        },
        guild: { type: String, required: false },
        punishments: {
            type: [
                {
                    type: { type: String, required: true },
                    time: { type: Number, required: false },
                    reason: { type: String, required: true },
                    modId: { type: String, required: true },
                    date: { type: Date, required: true },
                },
            ],
            required: true,
        },
    }),
    "users",
    { connection: client?.db.connection }
);

export default User;
