import { ExtendedInteraction } from "./../typings/Command";
import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import { Modal } from "../structures/Modal";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";

let components = new Array(
    new ActionRowBuilder().addComponents(
        new TextInputBuilder()
            .setCustomId("limit")
            .setLabel("Максимальное количество участников в комнате")
            .setPlaceholder("0 -> неограниченно")
            .setMaxLength(2)
            .setMinLength(1)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "proom_changeLimit";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Измение лимита комнаты");

        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
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
        let limit = Number(args.getTextInputValue("limit"));
        if (isNaN(limit))
            return await interaction.reply({
                content: "Лимит должен состоять только из цифр",
                ephemeral: true,
            });
        if (limit < 0)
            return await interaction.reply({
                content: "Лимит должен быть больше или равен нулю.",
                ephemeral: true,
            });
        await interaction.reply({
            content: `Установлен новый лимит: ${limit}`,
            ephemeral: true,
        });
        await interaction.member.voice.channel.setUserLimit(limit);
    },
});
