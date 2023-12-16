import {
    ActionRowBuilder,
    MessageActionRowComponentBuilder,
    SlashCommandChannelOption,
    TextChannel,
} from "discord.js";
import { Command } from "../../structures/Command";
import { ExtendedEmbed } from "../../structures/Embed";

export default new Command({
    name: "setup-verify",
    description: "Setup verify",
    options: [
        new SlashCommandChannelOption()
            .setName("channel")
            .setDescription("Channel to setup verify panel in")
            .setRequired(true),
    ],
    run: async ({ interaction, args, client }) => {
        const channel = args.getChannel("channel", true) as TextChannel;
        if (!channel)
            return interaction.reply({
                content: "Channel not found",
                ephemeral: true,
            });

        await channel.send({
            embeds: [
                new ExtendedEmbed()
                    .setTimestamp(null)
                    .setDescription(
                        "Песок. Вокруг один песок и ничего больше. Дюны, как бесконечное море, устремляются к горизонту. Одинокий путник, отбрасывая тень, бредёт сквозь иссохшие пустоши, некогда бывшие плодородной землёй. Каждый шаг приближает смерть ровно настолько, насколько и отдаляет надежду. Пустыня жестока, а ночь слишком длинна. На одном из уступов ноги уставшего путника подкашиваются, а сам он падает без чувств..."
                    )
                    .setImage(
                        "https://media.discordapp.net/attachments/786930042265272330/1125469092837593209/1663814946_1-phonoteka-org-p-oboi-pustinya-vkontakte-2.jpg?width=1202&height=676"
                    ),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    client.buttons.get("verify").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });
        await interaction.reply({
            content: `Verification panel linked to ${channel}`,
            ephemeral: true,
        });
    },
});
