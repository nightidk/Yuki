"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutes = void 0;
const Timer_1 = require("../structures/Timer");
const __1 = require("..");
const CommandFunctions_1 = require("../functions/CommandFunctions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
async function loop() {
    let timestamp = (0, CommandFunctions_1.getTimestamp)();
    const users = await (0, DatabaseFunctions_1.getMuteLTETimestamp)(timestamp);
    users.forEach(async (doc) => {
        const user = __1.client.guilds.cache
            .get("1125026376425148516")
            .members.cache.get(doc.userId);
        if (user)
            await user.roles.remove("1125191372501176373").catch(() => { });
        await (0, DatabaseFunctions_1.deleteMute)(doc.userId);
    });
}
function mutes() {
    let timer = (0, Timer_1.Timer)("mutes", loop, 5000);
    __1.client.loops.set("mutes", timer);
}
exports.mutes = mutes;
