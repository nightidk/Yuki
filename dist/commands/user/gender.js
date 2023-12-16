"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const Embed_1 = require("../../structures/Embed");
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "gender",
    description: "Выдать пользователю гендерную роль",
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    options: [
        new discord_js_1.SlashCommandStringOption()
            .addChoices({ name: "Девушка", value: "girl" }, { name: "Парень", value: "boy" })
            .setRequired(true)
            .setName("gender")
            .setDescription("Какую роль выдать"),
        new discord_js_1.SlashCommandUserOption()
            .setName("user")
            .setRequired(true)
            .setDescription("Пользователь"),
    ],
    run: async ({ client, interaction, args }) => {
        const gender = args.getString("gender", true);
        const user = args.getMember("user");
        if (!user)
            return await interaction.reply({
                ephemeral: true,
                content: "Пользователь не найден.",
            });
        switch (gender) {
            case "girl":
                await user.roles
                    .remove(["1125097235122753586", "1125122795056156773"])
                    .catch(() => { });
                await user.roles.add("1125097245411385344").catch(() => { });
                await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed()
                            .setFooter({
                            text: interaction.member.nickname,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        })
                            .setDescription(`Пользователю ${user} выдана роль <@&1125097245411385344>`),
                    ],
                });
                break;
            case "boy":
                await user.roles
                    .remove(["1125097245411385344", "1125122795056156773"])
                    .catch(() => { });
                await user.roles.add("1125097235122753586").catch(() => { });
                await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed()
                            .setFooter({
                            text: interaction.member.nickname,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        })
                            .setDescription(`Пользователю ${user} выдана роль <@&1125097235122753586>`),
                    ],
                });
                break;
        }
    },
});
