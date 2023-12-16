import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";

const customId = "proom_changeLock";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setEmoji("<:plock:971829775901548615>");

        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await getRoom(interaction.member.voice.channelId);
        if (!room)
            return await interaction.reply({
                content: "Ты должен находится в приватной комнате.",
                ephemeral: true,
            });
        if (room.ownerId !== interaction.member.id)
            return await interaction.reply({
                content: "Ты не являешься владельцом данной комнаты.",
                ephemeral: true,
            });

        let voice = interaction.member.voice.channel;

        if (voice.permissionsFor("1125080526391349348").has("Connect")) {
            await voice.permissionOverwrites.edit("1125080526391349348", {
                Connect: false,
            });
            await interaction.reply({
                content: "Доступ закрыт для других пользователей.",
                ephemeral: true,
            });
        } else {
            await voice.permissionOverwrites.edit("1125080526391349348", {
                Connect: true,
            });
            await interaction.reply({
                content: "Доступ открыт для других пользователей.",
                ephemeral: true,
            });
        }
    },
});
