"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const Story = (0, mongoose_1.model)("story", new mongoose_1.Schema({
    userId: { type: String, required: true },
    chapter: { default: "main", type: String, required: true },
    storyPage: { default: 0, type: Number, required: true },
    points: { default: 0, type: Number, required: true },
}), "stories", { connection: __1.client?.db.connection });
exports.default = Story;
