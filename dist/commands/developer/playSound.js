"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../index");
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const Embed_1 = require("../../structures/Embed");
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "play-sounds",
    description: "test",
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    run: async ({ interaction }) => {
        await interaction.reply({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription("Выберите действие:")
                    .setAuthor({
                    name: "Голосовое управление",
                }),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(index_1.client.buttons.get("sounds_join").build()),
                new discord_js_1.ActionRowBuilder().addComponents(index_1.client.buttons.get("sounds_play1").build(), index_1.client.buttons.get("sounds_play2").build(), index_1.client.buttons.get("sounds_play3").build(), index_1.client.buttons.get("sounds_play4").build(), index_1.client.buttons.get("sounds_stream").build()),
                new discord_js_1.ActionRowBuilder().addComponents(index_1.client.buttons.get("sounds_stop").build()),
                new discord_js_1.ActionRowBuilder().addComponents(index_1.client.buttons.get("sounds_leave").build()),
            ],
            ephemeral: true,
        });
    },
});
