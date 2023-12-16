"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const User = (0, mongoose_1.model)("user", new mongoose_1.Schema({
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
}), "users", { connection: __1.client?.db.connection });
exports.default = User;
