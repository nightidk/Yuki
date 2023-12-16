"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const Embed_1 = require("../../structures/Embed");
exports.default = new Command_1.Command({
    name: "setup-prp",
    description: "Setup PRP",
    options: [
        new discord_js_1.SlashCommandChannelOption()
            .setName("channel")
            .setDescription("Channel to setup PRP in")
            .setRequired(true),
    ],
    run: async ({ interaction, args, client }) => {
        const channel = args.getChannel("channel", true);
        if (!channel)
            return interaction.reply({
                content: "Channel not found",
                ephemeral: true,
            });
        await channel.send({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setTimestamp(null)
                    .setAuthor({ name: "Управление приватными каналами" })
                    .setDescription(`<:pedit:971829775947665418> - изменение названия
<:puser:971829776056729611> - изменения лимита
<:plock:971829775901548615> - управления доступа всем пользователям
<:pkey:971829776123834398> - выдача/отзыв доступа пользователю
<:pcrown:971829775993810954> - получить права на владение комнатой
<:pfavorite:971831753033539634> - передать права на владение комнатой

[Как получить ID пользователя?](https://support.discord.com/hc/ru/articles/206346498-Где-мне-найти-ID-пользователя-сервера-сообщения-)`),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("proom_changeName").build(), client.buttons.get("proom_changeLimit").build(), client.buttons.get("proom_changeLock").build(), client.buttons.get("proom_changeAccess").build()),
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("proom_getOwner").build(), client.buttons.get("proom_transferOwner").build()),
            ],
        });
        await interaction.reply({
            content: `Private rooms panel linked to ${channel}`,
            ephemeral: true,
        });
    },
});
