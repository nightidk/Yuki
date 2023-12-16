import {
    ApplicationCommandOptionData,
    GuildMember,
    SlashCommandStringOption,
    SlashCommandUserOption,
} from "discord.js";
import { Command } from "../../structures/Command";
import { ExtendedEmbed } from "../../structures/Embed";
import { userPermissions } from "../../typings/userPermissions";

export default new Command({
    name: "gender",
    description: "Выдать пользователю гендерную роль",
    userPermissions: userPermissions.DEFAULT,
    options: [
        new SlashCommandStringOption()
            .addChoices(
                { name: "Девушка", value: "girl" },
                { name: "Парень", value: "boy" }
            )
            .setRequired(true)
            .setName("gender")
            .setDescription(
                "Какую роль выдать"
            ) as ApplicationCommandOptionData,
        new SlashCommandUserOption()
            .setName("user")
            .setRequired(true)
            .setDescription("Пользователь"),
    ],
    run: async ({ client, interaction, args }) => {
        const gender = args.getString("gender", true);
        const user = args.getMember("user") as GuildMember;

        if (!user)
            return await interaction.reply({
                ephemeral: true,
                content: "Пользователь не найден.",
            });

        switch (gender) {
            case "girl":
                await user.roles
                    .remove(["1125097235122753586", "1125122795056156773"])
                    .catch(() => {});
                await user.roles.add("1125097245411385344").catch(() => {});
                await interaction.reply({
                    embeds: [
                        new ExtendedEmbed()
                            .setFooter({
                                text: interaction.member.nickname,
                                iconURL: interaction.member.displayAvatarURL({
                                    forceStatic: false,
                                }),
                            })
                            .setDescription(
                                `Пользователю ${user} выдана роль <@&1125097245411385344>`
                            ),
                    ],
                });
                break;
            case "boy":
                await user.roles
                    .remove(["1125097245411385344", "1125122795056156773"])
                    .catch(() => {});
                await user.roles.add("1125097235122753586").catch(() => {});
                await interaction.reply({
                    embeds: [
                        new ExtendedEmbed()
                            .setFooter({
                                text: interaction.member.nickname,
                                iconURL: interaction.member.displayAvatarURL({
                                    forceStatic: false,
                                }),
                            })
                            .setDescription(
                                `Пользователю ${user} выдана роль <@&1125097235122753586>`
                            ),
                    ],
                });
                break;
        }
    },
});
