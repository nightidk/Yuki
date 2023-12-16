"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const Guild = (0, mongoose_1.model)("guild", new mongoose_1.Schema({
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
}), "guilds", { connection: __1.client?.db.connection });
exports.default = Guild;
