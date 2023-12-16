"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const ReactionFunctions_1 = require("../functions/ReactionFunctions");
const DotCommand_1 = require("../structures/DotCommand");
const Embed_1 = require("../structures/Embed");
exports.default = new DotCommand_1.DotCommand({
    name: "cheek",
    aliases: ["щечка"],
    run: async ({ client, message, mentions }) => {
        const image = await (0, ReactionFunctions_1.getRandomImage)("cheek");
        if (mentions.length == 0)
            await message.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription(`Укажите пользователя.`)
                        .setAuthor({ name: "Реакция - поцелуй в щёчку" })
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
                    new Embed_1.ExtendedEmbed()
                        .setDescription(`${mentions.at(0)}, тебя хочет поцеловать в щёчку ${message.member}. Что ответишь?`)
                        .setAuthor({ name: "Реакция - поцелуй в щёчку" })
                        .setFooter({
                        text: message.member.displayName,
                        iconURL: message.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
                components: [
                    new discord_js_2.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setCustomId("yes")
                        .setEmoji("<:yes:879083428836933712>")
                        .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
                        .setCustomId("no")
                        .setEmoji("<:no:879083439742152744>")
                        .setStyle(discord_js_1.ButtonStyle.Danger)),
                ],
            });
            client.tempButtons.push(msg.id);
            const reactionAnswer = message.channel.createMessageComponentCollector({
                componentType: discord_js_1.ComponentType.Button,
                filter: (i) => i.message.id == msg.id &&
                    i.member.id == mentions.at(0).id,
                time: 60000,
            });
            reactionAnswer.on("collect", async (i) => {
                reactionAnswer.stop("collected");
                switch (i.customId) {
                    case "yes":
                        await msg.edit({
                            embeds: [
                                new Embed_1.ExtendedEmbed()
                                    .setDescription(`${message.author} поцеловал${message.member.roles.cache.has("1125097245411385344")
                                    ? "а"
                                    : mentions
                                        .at(0)
                                        .roles.cache.has("1125122795056156773")
                                        ? "(-а)"
                                        : ""} в щёчку ${mentions.at(0)}`)
                                    .setImage(image)
                                    .setAuthor({
                                    name: "Реакция - поцелуй в щёчку",
                                })
                                    .setFooter({
                                    text: message.member.displayName,
                                    iconURL: message.member.displayAvatarURL({
                                        forceStatic: false,
                                    }),
                                }),
                            ],
                            components: [],
                        });
                        client.tempButtons.splice(client.tempButtons.indexOf(msg.id), 1);
                        break;
                    case "no":
                        await msg.edit({
                            embeds: [
                                new Embed_1.ExtendedEmbed()
                                    .setDescription(`${mentions.at(0)} ответил${mentions
                                    .at(0)
                                    .roles.cache.has("1125097245411385344")
                                    ? "а"
                                    : mentions
                                        .at(0)
                                        .roles.cache.has("1125122795056156773")
                                        ? "(-а)"
                                        : ""} отказом.`)
                                    .setAuthor({
                                    name: "Реакция - поцелуй в щёчку",
                                })
                                    .setFooter({
                                    text: message.member.displayName,
                                    iconURL: message.member.displayAvatarURL({
                                        forceStatic: false,
                                    }),
                                }),
                            ],
                            components: [],
                        });
                        client.tempButtons.splice(client.tempButtons.indexOf(msg.id), 1);
                        break;
                }
            });
            reactionAnswer.on("end", async () => {
                if (reactionAnswer.endReason === "collected")
                    return;
                await msg.edit({
                    embeds: [
                        new Embed_1.ExtendedEmbed()
                            .setDescription(`${mentions.at(0)} тебя проигнорировал${mentions
                            .at(0)
                            .roles.cache.has("1125097245411385344")
                            ? "а"
                            : mentions
                                .at(0)
                                .roles.cache.has("1125122795056156773")
                                ? "(-а)"
                                : ""}.`)
                            .setAuthor({ name: "Реакция - поцелуй в щёчку" })
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
