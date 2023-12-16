import {
    APIActionRowComponent,
    MessageActionRowComponentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    UserSelectMenuBuilder,
    ComponentType,
    GuildMember,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";
import { ExtendedButtonInteraction } from "../typings/Button";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "proom_changeAccess";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setEmoji("<:pkey:971829776123834398>");

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

        await client.modals.get("proom_changeAccess").showModal(interaction);
    },
});
