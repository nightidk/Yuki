"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const Patch = (0, mongoose_1.model)("patch", new mongoose_1.Schema({
    version: { type: String, required: true },
    name: { type: String, required: true },
    notes: { type: [String], required: true },
    image: { type: String, required: true },
    activeNow: { type: Boolean, default: true, required: true },
}), "patches", { connection: __1.client?.db.connection });
exports.default = Patch;
