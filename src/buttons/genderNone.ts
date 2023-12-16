import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";

const customId = "genderNone";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Скрытый");

        return button;
    },
    run: async ({ client, interaction }) => {
        if (
            !interaction.member.roles.cache.has("1125097245411385344") &&
            !interaction.member.roles.cache.has("1125097235122753586")
        )
            await interaction.member.roles.add("1125122795056156773");
        client.buttons
            .get("verifyStep3")
            .run({ client: client, interaction: interaction });
    },
});
