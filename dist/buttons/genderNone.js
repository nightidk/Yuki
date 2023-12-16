"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const customId = "genderNone";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Скрытый");
        return button;
    },
    run: async ({ client, interaction }) => {
        if (!interaction.member.roles.cache.has("1125097245411385344") &&
            !interaction.member.roles.cache.has("1125097235122753586"))
            await interaction.member.roles.add("1125122795056156773");
        client.buttons
            .get("verifyStep3")
            .run({ client: client, interaction: interaction });
    },
});
