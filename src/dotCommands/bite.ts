import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";

export default new DotCommand({
    name: "bite",
    aliases: ["кусь", "укусить"],
    run: async ({ client, message, mentions }) => {
        const image = await getRandomImage("bite");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${message.author} делает кусь ${mentions.at(0)}`
                        )
                        .setImage(image)
                        .setAuthor({ name: "Реакция - кусь" })
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
                    new ExtendedEmbed()
                        .setDescription(`${message.author} делает кусь всем.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - кусь" })
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
