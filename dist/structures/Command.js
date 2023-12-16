"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(commandOptions) {
        commandOptions.dmPermission = false;
        Object.assign(this, commandOptions);
    }
}
exports.Command = Command;
