"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const customId = "proom_getOwner";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setEmoji("<:pcrown:971829775993810954>");
        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await (0, DatabaseFunctions_1.getRoom)(interaction.member.voice.channelId);
        if (!room)
            return await interaction.reply({
                content: "Ты должен находится в приватной комнате.",
                ephemeral: true,
            });
        if (room.ownerId === interaction.member.id)
            return await interaction.reply({
                content: "Ты и так являешься владельцом данной комнаты.",
                ephemeral: true,
            });
        if (interaction.member.voice.channel.members
            .map((m) => m.id)
            .includes(room.ownerId))
            return await interaction.reply({
                content: "Владелец данной комнаты находится в ней!",
                ephemeral: true,
            });
        await (0, DatabaseFunctions_1.setRoomOwner)(interaction.member.voice.channelId, interaction.member.id, interaction.member.voice.channel);
        await interaction.reply({
            content: "Ты стал владельцом данной комнаты.",
            ephemeral: true,
        });
    },
});
