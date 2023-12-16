"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Embed_1 = require("./../../structures/Embed");
const discord_js_2 = require("discord.js");
const Command_1 = require("./../../structures/Command");
const User_1 = tslib_1.__importDefault(require("../../schemas/User"));
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "marry",
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    description: "Предложить пользователю встречаться",
    options: [
        new discord_js_2.SlashCommandUserOption()
            .setName("user")
            .setDescription("Пользователь, которому ты хочешь предложить встречаться")
            .setRequired(true),
    ],
    run: async ({ client, interaction, args }) => {
        const user = args.getMember("user");
        if (user.id === interaction.member.id)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
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
        const userDB = await User_1.default.findOne({ userId: user.id });
        const memberDB = await User_1.default.findOne({ userId: interaction.member.id });
        if (userDB.marry.married)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
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
                    new Embed_1.ExtendedEmbed()
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
                new Embed_1.ExtendedEmbed()
                    .setDescription(`${user}, тебе предлагает встречаться ${interaction.member}. Что ответишь?`)
                    .setFooter({
                    text: interaction.member.displayName,
                    iconURL: interaction.member.displayAvatarURL({
                        forceStatic: false,
                    }),
                })
                    .setAuthor({ name: "Предложение" }),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                    .setCustomId("yes")
                    .setLabel(`Согласиться`)
                    .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
                    .setCustomId("no")
                    .setLabel(`Отказаться`)
                    .setStyle(discord_js_1.ButtonStyle.Danger)),
            ],
            fetchReply: true,
        });
        client.tempButtons.push(msg.id);
        const listenAnswer = interaction.channel.createMessageComponentCollector({
            componentType: discord_js_1.ComponentType.Button,
            filter: (i) => i.message.id === msg.id && i.member.id === user.id,
            time: 120000,
        });
        listenAnswer.on("collect", async (i) => {
            listenAnswer.stop("collected");
            if (userDB.marry.married) {
                await i.update({
                    embeds: [
                        new Embed_1.ExtendedEmbed()
                            .setDescription(`У ${user} есть уже активная семья!`)
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
                                new Embed_1.ExtendedEmbed()
                                    .setDescription(`У ${interaction.member} есть уже активная семья!`)
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
                    await i.update({
                        embeds: [
                            new Embed_1.ExtendedEmbed()
                                .setDescription(`Поздравляем! ${user} и ${interaction.member} начали встречаться!`)
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
                    await User_1.default.updateOne({
                        userId: user.id,
                    }, {
                        $set: {
                            "marry.married": true,
                            "marry.partner": interaction.member.id,
                            "marry.typeMarry": "dating",
                            "marry.marryDate": new Date(),
                        },
                    });
                    await User_1.default.updateOne({
                        userId: interaction.member.id,
                    }, {
                        $set: {
                            "marry.married": true,
                            "marry.partner": user.id,
                            "marry.typeMarry": "dating",
                            "marry.marryDate": new Date(),
                        },
                    });
                    break;
                case "no":
                    await i.update({
                        embeds: [
                            new Embed_1.ExtendedEmbed()
                                .setDescription(`${user} отказал${user.roles.cache.has("1125097245411385344")
                                ? "а"
                                : user.roles.cache.has("1125122795056156773")
                                    ? "(-а)"
                                    : ""} тебе.`)
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
                    break;
            }
        });
        listenAnswer.on("end", async () => {
            if (listenAnswer.endReason === "collected")
                return;
            await msg.edit({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription(`${user} проигнорировал${user.roles.cache.has("1125097245411385344")
                        ? "а"
                        : user.roles.cache.has("1125122795056156773")
                            ? "(-а)"
                            : ""} твоё предложение.`)
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
