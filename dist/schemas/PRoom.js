"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const __1 = require("..");
const PRoom = (0, mongoose_1.model)("proom", new mongoose_1.Schema({
    roomId: { type: String, required: true },
    ownerId: { type: String, required: true },
}), "prooms", { connection: __1.client?.db.connection });
exports.default = PRoom;
