"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const Mute = (0, mongoose_1.model)("mute", new mongoose_1.Schema({
    userId: { type: String, required: true },
    modId: { type: String, required: true },
    reason: { type: String, required: true },
    timestampEnd: { type: Number, required: true },
}), "mutes", { connection: __1.client?.db.connection });
exports.default = Mute;
