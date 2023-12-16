"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const customId = "dev_restart";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEVELOPER,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Перезагрузка");
        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setAuthor({ name: "Панель разработчика" })
                    .setDescription("Выполняется перезагрузка!\n\nКак только она завершится - панель снова станет доступна."),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons
                    .get("dev_panel")
                    .build()
                    .setLabel("Назад к панели")),
            ],
        });
        (0, child_process_1.spawn)("pm2", ["restart", "index"]);
    },
});
