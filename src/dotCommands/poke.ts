import { getRandomImage } from "../functions/ReactionFunctions";
import { DotCommand } from "../structures/DotCommand";
import { ExtendedEmbed } from "../structures/Embed";

export default new DotCommand({
    name: "poke",
    aliases: ["тык", "тыкнуть"],
    run: async ({ client, message, mentions }) => {
        const image = await getRandomImage("poke");
        if (mentions.length > 0)
            await message.reply({
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            `${message.author} тыкает в ${mentions.at(0)}`
                        )
                        .setImage(image)
                        .setAuthor({ name: "Реакция - тыкнуть" })
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
                        .setDescription(`${message.author} тыкает во всех.`)
                        .setImage(image)
                        .setAuthor({ name: "Реакция - тыкнуть" })
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
