"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const customId = "mod_unban";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.CURATOR,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Danger);
        button.setLabel("Разблокировка");
        return button;
    },
    run: async ({ client, interaction }) => {
        await client.modals.get("mod_unban").showModal(interaction);
    },
});
