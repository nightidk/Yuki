import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";

export default new DotCommand({
    name: "bonk",
    aliases: ["бонк"],
    run: async ({ client, message, mentions }) => {
        const image = await getRandomImage("bonk");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${message.author} бонкает ${mentions.at(0)}`
                        )
                        .setImage(image)
                        .setAuthor({ name: "Реакция - бонк" })
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
                        .setDescription(`${message.author} бонкает всем.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - бонк" })
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
