import { ButtonBuilder, ButtonStyle } from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";

const customId = "proom_changeLimit";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setEmoji("<:puser:971829776056729611>");

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
        let modal = client.modals.get("proom_changeLimit");

        await modal.showModal(interaction);
    },
});
