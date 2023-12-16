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

const customId = "dev_restart";

export default new Button({
    userPermissions: userPermissions.DEVELOPER,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Перезагрузка");

        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new ExtendedEmbed()
                    .setAuthor({ name: "Панель разработчика" })
                    .setDescription(
                        "Выполняется перезагрузка!\n\nКак только она завершится - панель снова станет доступна."
                    ),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    client.buttons
                        .get("dev_panel")
                        .build()
                        .setLabel("Назад к панели")
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });
        spawn("pm2", ["restart", "index"]);
    },
});
