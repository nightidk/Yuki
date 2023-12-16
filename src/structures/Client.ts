import { DotCommandType } from "./../typings/DotCommand";
import { ButtonType } from "./../typings/Button";
import { ModalType } from "./../typings/Modal";
import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    GuildMember,
} from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/RegisterCommandsOptions";
import { Event } from "./Event";
import { Database } from "./Database";
import { runLoops } from "../loops/startLoops";
import { NodeactylClient } from "nodeactyl";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    modals: Collection<string, ModalType> = new Collection();
    buttons: Collection<string, ButtonType> = new Collection();
    dotCommands: Collection<string, DotCommandType> = new Collection();
    tempButtons: Array<string> = new Array();
    db: Database = new Database();
    loops: Collection<string, NodeJS.Timeout> = new Collection();
    oldVoiceMembers: Array<GuildMember> = new Array();
    hostClient = new NodeactylClient(
        "https://dash.dscrd.ru",
        "ptlc_dR1hw4BK0GhVen0oQYi23Mkw07dhfPFkuwBskILcZ8e"
    );

    constructor() {
        super({ intents: 36863 });
    }

    async start() {
        await this.registerModules();
        await this.login(process.env.botToken);
    }

    async #importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async #registerCommands({ commands }: RegisterCommandsOptions) {
        await this.application?.commands.set(commands);
        console.log("Команды установлены глобально.");
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname.replace(/\\/g, "/")}/../commands/**/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.#importFile(filePath);
            if (!command.name) return;

            console.log(`[Command] ${command.name} -> ready.`);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.#registerCommands({
                commands: slashCommands,
            });
            runLoops();
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname.replace(/\\/g, "/")}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.#importFile(
                filePath
            );
            this[event.once ? "once" : "on"](event.event, event.run);
            const fileName = filePath.split("/").at(-1).slice(0, -3);
            console.log(`[Event] ${fileName} -> ready.`);
        });

        // Modal
        const modalFiles = await globPromise(
            `${__dirname.replace(/\\/g, "/")}/../modals/*{.ts,.js}`
        );
        modalFiles.forEach(async (filePath) => {
            const modal: ModalType = await this.#importFile(filePath);

            this.modals.set(modal.getCustomId(), modal);
            console.log(`[Modal] ${modal.getCustomId()} -> ready.`);
        });

        // Button
        const buttonFiles = await globPromise(
            `${__dirname.replace(/\\/g, "/")}/../buttons/*{.ts,.js}`
        );
        buttonFiles.forEach(async (filePath) => {
            const button: ButtonType = await this.#importFile(filePath);

            this.buttons.set(button.getCustomId(), button);
            console.log(`[Button] ${button.getCustomId()} -> ready.`);
        });

        // Dot Command
        const dotCommandFiles = await globPromise(
            `${__dirname.replace(/\\/g, "/")}/../dotCommands/*{.ts,.js}`
        );
        dotCommandFiles.forEach(async (filePath) => {
            const dotCommand: DotCommandType = await this.#importFile(filePath);

            this.dotCommands.set(dotCommand.name, dotCommand);
            console.log(
                `[DotCommand] ${dotCommand.name} (${dotCommand.aliases.join(
                    ", "
                )}) -> ready.`
            );
            dotCommand.aliases.forEach((alias) =>
                this.dotCommands.set(alias, dotCommand)
            );
        });

        // Select Menu - WORK
    }
}
