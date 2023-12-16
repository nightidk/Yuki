import {
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { ActionRowBuilder } from "discord.js";
import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";
import { getUser } from "../functions/DatabaseFunctions";

export default new DotCommand({
    name: "kiss",
    aliases: ["поцеловать"],
    run: async ({ client, message, mentions }) => {
        if (mentions.length == 0) return;
        const userDB = await getUser(message.author.id);
        if (!userDB.marry.married) return;
        if (userDB.marry.partner !== mentions.at(0).id) return;
        const image = await getRandomImage("kiss");
        if (mentions.length == 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(`Укажите пользователя.`)
                        .setAuthor({ name: "Реакция - поцелуй" })
                        .setFooter({
                            text: message.member.displayName,
                            iconURL: message.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
            });
        else {
            const msg = await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${mentions.at(0)}, тебя хочет поцеловать ${
                                message.member
                            }. Что ответишь?`
                        )
                        .setAuthor({ name: "Реакция - поцелуй" })
                        .setFooter({
                            text: message.member.displayName,
                            iconURL: message.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("yes")
                            .setEmoji("<:yes:879083428836933712>")
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId("no")
                            .setEmoji("<:no:879083439742152744>")
                            .setStyle(ButtonStyle.Danger)
                    ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
                ],
            });
            client.tempButtons.push(msg.id);

            const reactionAnswer =
                message.channel.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    filter: (i) =>
                        i.message.id == msg.id &&
                        i.member.id == mentions.at(0).id,
                    time: 60000,
                });

            reactionAnswer.on("collect", async (i) => {
                reactionAnswer.stop("collected");
                switch (i.customId) {
                    case "yes":
                        await msg.edit({
                            embeds: [
                                new ExtendedEmbed()
                                    .setDescription(
                                        `${message.author} поцеловал${
                                            message.member.roles.cache.has(
                                                "1125097245411385344"
                                            )
                                                ? "а"
                                                : mentions
                                                      .at(0)
                                                      .roles.cache.has(
                                                          "1125122795056156773"
                                                      )
                                                ? "(-а)"
                                                : ""
                                        } ${mentions.at(0)}`
                                    )
                                    .setImage(image)
                                    .setAuthor({
                                        name: "Реакция - поцелуй",
                                    })
                                    .setFooter({
                                        text: message.member.displayName,
                                        iconURL:
                                            message.member.displayAvatarURL({
                                                forceStatic: false,
                                            }),
                                    }),
                            ],
                            components: [],
                        });
                        client.tempButtons.splice(
                            client.tempButtons.indexOf(msg.id),
                            1
                        );
                        break;
                    case "no":
                        await msg.edit({
                            embeds: [
                                new ExtendedEmbed()
                                    .setDescription(
                                        `${mentions.at(0)} ответил${
                                            mentions
                                                .at(0)
                                                .roles.cache.has(
                                                    "1125097245411385344"
                                                )
                                                ? "а"
                                                : mentions
                                                      .at(0)
                                                      .roles.cache.has(
                                                          "1125122795056156773"
                                                      )
                                                ? "(-а)"
                                                : ""
                                        } отказом.`
                                    )
                                    .setAuthor({
                                        name: "Реакция - поцелуй",
                                    })
                                    .setFooter({
                                        text: message.member.displayName,
                                        iconURL:
                                            message.member.displayAvatarURL({
                                                forceStatic: false,
                                            }),
                                    }),
                            ],
                            components: [],
                        });
                        client.tempButtons.splice(
                            client.tempButtons.indexOf(msg.id),
                            1
                        );
                        break;
                }
            });

            reactionAnswer.on("end", async () => {
                if (reactionAnswer.endReason === "collected") return;

                await msg.edit({
                    embeds: [
                        new ExtendedEmbed()
                            .setDescription(
                                `${mentions.at(0)} тебя проигнорировал${
                                    mentions
                                        .at(0)
                                        .roles.cache.has("1125097245411385344")
                                        ? "а"
                                        : mentions
                                              .at(0)
                                              .roles.cache.has(
                                                  "1125122795056156773"
                                              )
                                        ? "(-а)"
                                        : ""
                                }.`
                            )
                            .setAuthor({ name: "Реакция - поцелуй" })
                            .setFooter({
                                text: message.member.displayName,
                                iconURL: message.member.displayAvatarURL({
                                    forceStatic: false,
                                }),
                            }),
                    ],
                    components: [],
                });
            });
        }
    },
});
