"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLoops = void 0;
const mutes_1 = require("./mutes");
const serverBanner_1 = require("./serverBanner");
const voiceStats_1 = require("./voiceStats");
function runLoops() {
    (0, voiceStats_1.voiceStats)();
    (0, serverBanner_1.serverBanner)();
    (0, mutes_1.mutes)();
}
exports.runLoops = runLoops;
