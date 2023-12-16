import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "verify";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Продолжить");

        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new ExtendedEmbed()
                    .setTimestamp(null)
                    .setDescription(
                        `...Голоса отдаются в голове пронзительной болью.
- Куда?
- Пока к остальным, дальше он сам. Мы же не Красный крест какой-нибудь.
- А если Кен-Гетто сцапает?
- А тебя это сильно волнует?...
- Очередной безымянный дивергент, интересно, как долго он тут проживет?`
                    )
                    .setImage(
                        "https://media.discordapp.net/attachments/786930042265272330/1125468494021013554/QaYQqi6K.jpg"
                    ),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    client.buttons.get("verifyStep2").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });
    },
});
