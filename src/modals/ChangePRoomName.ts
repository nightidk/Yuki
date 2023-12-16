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
            .setCustomId("name")
            .setLabel("Новое название")
            .setMaxLength(60)
            .setMinLength(1)
            .setPlaceholder("Введите новое название")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "proom_changeName";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Измение названия комнаты");

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
        let name = args.getTextInputValue("name");
        await interaction.reply({
            content: `Уставновлено новое название: ${name}`,
            ephemeral: true,
        });
        await interaction.member.voice.channel.setName(name);
    },
});
