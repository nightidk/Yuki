import { DotCommandType } from "../typings/DotCommand";

export class DotCommand {
    constructor(commandOptions: DotCommandType) {
        Object.assign(this, commandOptions);
    }
}
