"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const Database_1 = require("./Database");
const startLoops_1 = require("../loops/startLoops");
const nodeactyl_1 = require("nodeactyl");
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    modals = new discord_js_1.Collection();
    buttons = new discord_js_1.Collection();
    dotCommands = new discord_js_1.Collection();
    tempButtons = new Array();
    db = new Database_1.Database();
    loops = new discord_js_1.Collection();
    oldVoiceMembers = new Array();
    hostClient = new nodeactyl_1.NodeactylClient("https://dash.dscrd.ru", "ptlc_dR1hw4BK0GhVen0oQYi23Mkw07dhfPFkuwBskILcZ8e");
    constructor() {
        super({ intents: 36863 });
    }
    async start() {
        await this.registerModules();
        await this.login(process.env.botToken);
    }
    async #importFile(filePath) {
        return (await Promise.resolve(`${filePath}`).then(s => tslib_1.__importStar(require(s))))?.default;
    }
    async #registerCommands({ commands }) {
        await this.application?.commands.set(commands);
        console.log("Команды установлены глобально.");
    }
    async registerModules() {
        // Commands
        const slashCommands = [];
        const commandFiles = await globPromise(`${__dirname.replace(/\\/g, "/")}/../commands/**/*{.ts,.js}`);
        commandFiles.forEach(async (filePath) => {
            const command = await this.#importFile(filePath);
            if (!command.name)
                return;
            console.log(`[Command] ${command.name} -> ready.`);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        this.on("ready", () => {
            this.#registerCommands({
                commands: slashCommands,
            });
            (0, startLoops_1.runLoops)();
        });
        // Event
        const eventFiles = await globPromise(`${__dirname.replace(/\\/g, "/")}/../events/*{.ts,.js}`);
        eventFiles.forEach(async (filePath) => {
            const event = await this.#importFile(filePath);
            this[event.once ? "once" : "on"](event.event, event.run);
            const fileName = filePath.split("/").at(-1).slice(0, -3);
            console.log(`[Event] ${fileName} -> ready.`);
        });
        // Modal
        const modalFiles = await globPromise(`${__dirname.replace(/\\/g, "/")}/../modals/*{.ts,.js}`);
        modalFiles.forEach(async (filePath) => {
            const modal = await this.#importFile(filePath);
            this.modals.set(modal.getCustomId(), modal);
            console.log(`[Modal] ${modal.getCustomId()} -> ready.`);
        });
        // Button
        const buttonFiles = await globPromise(`${__dirname.replace(/\\/g, "/")}/../buttons/*{.ts,.js}`);
        buttonFiles.forEach(async (filePath) => {
            const button = await this.#importFile(filePath);
            this.buttons.set(button.getCustomId(), button);
            console.log(`[Button] ${button.getCustomId()} -> ready.`);
        });
        // Dot Command
        const dotCommandFiles = await globPromise(`${__dirname.replace(/\\/g, "/")}/../dotCommands/*{.ts,.js}`);
        dotCommandFiles.forEach(async (filePath) => {
            const dotCommand = await this.#importFile(filePath);
            this.dotCommands.set(dotCommand.name, dotCommand);
            console.log(`[DotCommand] ${dotCommand.name} (${dotCommand.aliases.join(", ")}) -> ready.`);
            dotCommand.aliases.forEach((alias) => this.dotCommands.set(alias, dotCommand));
        });
        // Select Menu - WORK
    }
}
exports.ExtendedClient = ExtendedClient;
