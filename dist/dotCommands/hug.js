"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactionFunctions_1 = require("../functions/ReactionFunctions");
const DotCommand_1 = require("../structures/DotCommand");
const Embed_1 = require("../structures/Embed");
exports.default = new DotCommand_1.DotCommand({
    name: "hug",
    aliases: ["обнять"],
    run: async ({ client, message, mentions }) => {
        const image = await (0, ReactionFunctions_1.getRandomImage)("hug");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription(`${message.author} обнимает ${mentions.at(0)}`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - обнять" })
                        .setFooter({
                        text: message.member.displayName,
                        iconURL: message.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
        else
            await message.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription(`${message.author} обнимает всех.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - обнять" })
                        .setFooter({
                        text: message.member.displayName,
                        iconURL: message.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
    },
});
