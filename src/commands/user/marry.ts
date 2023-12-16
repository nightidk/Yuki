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
    name: "marry",
    userPermissions: userPermissions.DEFAULT,
    description: "Предложить пользователю встречаться",
    options: [
        new SlashCommandUserOption()
            .setName("user")
            .setDescription(
                "Пользователь, которому ты хочешь предложить встречаться"
            )
            .setRequired(true),
    ],
    run: async ({ client, interaction, args }) => {
        const user = args.getMember("user") as GuildMember;
        if (user.id === interaction.member.id)
            return await interaction.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription("Вы не можете создать семью с собой.")
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
                ephemeral: true,
            });

        const userDB = await User.findOne({ userId: user.id });
        const memberDB = await User.findOne({ userId: interaction.member.id });

        if (userDB.marry.married)
            return await interaction.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription("У пользователя уже есть семья.")
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
            });

        if (memberDB.marry.married)
            return await interaction.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription("У тебя уже есть семья.")
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
            });

        const msg = await interaction.reply({
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        `${user}, тебе предлагает встречаться ${interaction.member}. Что ответишь?`
                    )
                    .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    })
                    .setAuthor({ name: "Предложение" }),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("yes")
                        .setLabel(`Согласиться`)
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId("no")
                        .setLabel(`Отказаться`)
                        .setStyle(ButtonStyle.Danger)
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
            fetchReply: true,
        });

        client.tempButtons.push(msg.id);

        const listenAnswer =
            interaction.channel.createMessageComponentCollector({
                componentType: ComponentType.Button,
                filter: (i) =>
                    i.message.id === msg.id && i.member.id === user.id,
                time: 120000,
            });

        listenAnswer.on("collect", async (i) => {
            listenAnswer.stop("collected");
            if (userDB.marry.married) {
                await i.update({
                    embeds: [
                        new ExtendedEmbed()
                            .setDescription(
                                `У ${user} есть уже активная семья!`
                            )
                            .setFooter({
                                text: interaction.member.displayName,
                                iconURL: interaction.member.displayAvatarURL({
                                    forceStatic: false,
                                }),
                            })
                            .setAuthor({ name: "Предложение" }),
                    ],
                    components: [],
                });
                return;
            }
            switch (i.customId) {
                case "yes":
                    if (memberDB.marry.married) {
                        await i.update({
                            embeds: [
                                new ExtendedEmbed()
                                    .setDescription(
                                        `У ${interaction.member} есть уже активная семья!`
                                    )
                                    .setFooter({
                                        text: interaction.member.displayName,
                                        iconURL:
                                            interaction.member.displayAvatarURL(
                                                {
                                                    forceStatic: false,
                                                }
                                            ),
                                    })
                                    .setAuthor({ name: "Предложение" }),
                            ],
                            components: [],
                        });
                        return;
                    }
                    await i.update({
                        embeds: [
                            new ExtendedEmbed()
                                .setDescription(
                                    `Поздравляем! ${user} и ${interaction.member} начали встречаться!`
                                )
                                .setFooter({
                                    text: interaction.member.displayName,
                                    iconURL:
                                        interaction.member.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                })
                                .setAuthor({ name: "Предложение" }),
                        ],
                        components: [],
                    });
                    await User.updateOne(
                        {
                            userId: user.id,
                        },
                        {
                            $set: {
                                "marry.married": true,
                                "marry.partner": interaction.member.id,
                                "marry.typeMarry": "dating",
                                "marry.marryDate": new Date(),
                            },
                        }
                    );
                    await User.updateOne(
                        {
                            userId: interaction.member.id,
                        },
                        {
                            $set: {
                                "marry.married": true,
                                "marry.partner": user.id,
                                "marry.typeMarry": "dating",
                                "marry.marryDate": new Date(),
                            },
                        }
                    );
                    break;
                case "no":
                    await i.update({
                        embeds: [
                            new ExtendedEmbed()
                                .setDescription(
                                    `${user} отказал${
                                        user.roles.cache.has(
                                            "1125097245411385344"
                                        )
                                            ? "а"
                                            : user.roles.cache.has(
                                                  "1125122795056156773"
                                              )
                                            ? "(-а)"
                                            : ""
                                    } тебе.`
                                )
                                .setFooter({
                                    text: interaction.member.displayName,
                                    iconURL:
                                        interaction.member.displayAvatarURL({
                                            forceStatic: false,
                                        }),
                                })
                                .setAuthor({ name: "Предложение" }),
                        ],
                        components: [],
                    });
                    break;
            }
        });

        listenAnswer.on("end", async () => {
            if (listenAnswer.endReason === "collected") return;

            await msg.edit({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${user} проигнорировал${
                                user.roles.cache.has("1125097245411385344")
                                    ? "а"
                                    : user.roles.cache.has(
                                          "1125122795056156773"
                                      )
                                    ? "(-а)"
                                    : ""
                            } твоё предложение.`
                        )
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        })
                        .setAuthor({ name: "Предложение" }),
                ],
                components: [],
            });
        });
    },
});
