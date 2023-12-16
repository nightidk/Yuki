import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    MessageActionRowComponentBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuComponent,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "verifyStep2";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Далее");

        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new ExtendedEmbed()
                    .setTimestamp(null)
                    .setDescription(
                        `...-Добро пожаловать в "Систему". Выберите ваш пол:`
                    ),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setURL("https://discord.gg/KYPZCWcAHf")
                        .setLabel("Получить роль")
                        .setStyle(ButtonStyle.Link),
                    client.buttons.get("checkGenderRole").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
                new ActionRowBuilder().addComponents(
                    client.buttons.get("genderNone").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });
    },
});
