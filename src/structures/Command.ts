import { CommandType } from "../typings/Command";

export class Command {
    constructor(commandOptions: CommandType) {
        commandOptions.dmPermission = false;
        Object.assign(this, commandOptions);
    }
}
