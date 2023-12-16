import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";

export default new DotCommand({
    name: "nom",
    aliases: ["покормить"],
    run: async ({ client, message, mentions }) => {
        const image = await getRandomImage("nom");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${message.author} кормит ${mentions.at(0)}`
                        )
                        .setImage(image)
                        .setAuthor({ name: "Реакция - кормить" })
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
                        .setDescription(`${message.author} накормил себя.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - кормить" })
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
