"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const Event_1 = require("../structures/Event");
exports.default = new Event_1.Event("ready", () => {
    console.log(`${index_1.client.user.tag} is now online`);
});
