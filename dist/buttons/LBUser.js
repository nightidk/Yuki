"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const customId = "mod_lb";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.MANAGER,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Primary);
        button.setLabel("Локальная блокировка");
        return button;
    },
    run: async ({ client, interaction }) => {
        await client.modals.get("mod_lb").showModal(interaction);
    },
});
