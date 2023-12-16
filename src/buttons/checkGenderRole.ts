import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "checkGenderRole";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Success);
        button.setLabel("Я получил(-а) роль");

        return button;
    },
    run: async ({ client, interaction }) => {
        if (
            interaction.member.roles.cache.has("1125097245411385344") ||
            interaction.member.roles.cache.has("1125097235122753586")
        )
            client.buttons
                .get("verifyStep3")
                .run({ client: client, interaction: interaction });
        else
            await interaction.reply({
                ephemeral: true,
                content: "Роль не найдена.",
            });
    },
});
