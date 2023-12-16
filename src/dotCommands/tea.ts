import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";

export default new DotCommand({
    name: "tea",
    aliases: ["чай"],
    run: async ({ client, message, mentions }) => {
        const image = await getRandomImage("tea");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${message.author} пьёт чай с ${mentions.at(0)}`
                        )
                        .setImage(image)
                        .setAuthor({ name: "Реакция - чай" })
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
                        .setDescription(`${message.author} пьёт чай.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - чай" })
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
