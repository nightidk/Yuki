import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    GuildMember,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { ExtendedEmbed } from "./../../structures/Embed";
import { SlashCommandUserOption } from "discord.js";
import { Command } from "./../../structures/Command";
import User from "../../schemas/User";
import { ExtendedButtonInteraction } from "../../typings/Button";
import { userPermissions } from "../../typings/userPermissions";
export default new Command({
    name: "divorce",
    userPermissions: userPermissions.DEFAULT,
    description: "Покинуть семью",
    run: async ({ client, interaction, args }) => {
        const user = args.getMember("user") as GuildMember;

        const memberDB = await User.findOne({ userId: interaction.member.id });

        if (!memberDB.marry.married)
            return await interaction.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription("Ты и так не состоишь в семье.")
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
            });

        await interaction.reply({
            embeds: [
                new ExtendedEmbed()
                    .setDescription(`${interaction.member} покинул свою семью.`)
                    .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    })
                    .setAuthor({ name: "Выход из семьи" }),
            ],
        });

        await User.updateOne(
            {
                userId: memberDB.marry.partner,
            },
            {
                $set: {
                    "marry.married": false,
                },
                $unset: {
                    "marry.partner": null,
                    "marry.typeMarry": null,
                    "marry.marryDate": null,
                },
            }
        );
        await User.updateOne(
            {
                userId: interaction.member.id,
            },
            {
                $set: {
                    "marry.married": false,
                },
                $unset: {
                    "marry.partner": null,
                    "marry.typeMarry": null,
                    "marry.marryDate": null,
                },
            }
        );
    },
});
