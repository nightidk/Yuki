import { spawn } from "child_process";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "mod_ban";

export default new Button({
    userPermissions: userPermissions.CURATOR,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Danger);
        button.setLabel("Блокировка");

        return button;
    },
    run: async ({ client, interaction }) => {
        await client.modals.get("mod_ban").showModal(interaction);
    },
});
