"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const customId = "verify";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Продолжить");
        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setTimestamp(null)
                    .setDescription(`...Голоса отдаются в голове пронзительной болью.
- Куда?
- Пока к остальным, дальше он сам. Мы же не Красный крест какой-нибудь.
- А если Кен-Гетто сцапает?
- А тебя это сильно волнует?...
- Очередной безымянный дивергент, интересно, как долго он тут проживет?`)
                    .setImage("https://media.discordapp.net/attachments/786930042265272330/1125468494021013554/QaYQqi6K.jpg"),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("verifyStep2").build()),
            ],
        });
    },
});
