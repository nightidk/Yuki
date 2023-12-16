"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelXP = void 0;
function getLevelXP(level) {
    return parseInt((((100 * level * 0.4) / 8) * 225 + (level / 0.8) * 100).toFixed(0));
}
exports.getLevelXP = getLevelXP;
