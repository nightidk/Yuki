"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const Lunix = (0, mongoose_1.model)("lunix", new mongoose_1.Schema({
    BETA_USERS: { type: [{ type: String }], required: true },
    DEVELOPERS: { type: [{ type: String }], required: true },
    STORY_SERVER: { type: String, required: true },
    RUNNED_COMMANDS: { type: Number, required: true },
}), "lunix", { connection: __1.client?.db.connection });
exports.default = Lunix;
