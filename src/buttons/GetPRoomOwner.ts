import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
    VoiceChannel,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { getRoom, setRoomOwner } from "../functions/DatabaseFunctions";

const customId = "proom_getOwner";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setEmoji("<:pcrown:971829775993810954>");

        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await getRoom(interaction.member.voice.channelId);
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

        if (
            interaction.member.voice.channel.members
                .map((m) => m.id)
                .includes(room.ownerId)
        )
            return await interaction.reply({
                content: "Владелец данной комнаты находится в ней!",
                ephemeral: true,
            });

        await setRoomOwner(
            interaction.member.voice.channelId,
            interaction.member.id,
            interaction.member.voice.channel as VoiceChannel
        );

        await interaction.reply({
            content: "Ты стал владельцом данной комнаты.",
            ephemeral: true,
        });
    },
});
