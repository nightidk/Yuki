// import { GuildMember, SlashCommandUserOption } from "discord.js";
// import { Command } from "../../structures/Command";
// import Mute from "../../schemas/Mute";
// import { ExtendedEmbed } from "../../structures/Embed";
// export default new Command({
//     name: "mute",
//     description:
//         "Ограничить пользователю доступ к голосовым и текстовым каналам.",
//     options: [
//         new SlashCommandUserOption()
//             .setName("user")
//             .setDescription("Пользователь, которому будет ограничен доступ")
//             .setRequired(true),
//     ],
//     run: async ({ interaction, args }) => {
//         const user = args.getMember("user") as GuildMember;
//         const muteDB = await Mute.findOne({ userId: user.id });
//         if (muteDB)
//             return await interaction.reply({
//                 embeds: [
//                     new ExtendedEmbed()
//                         .setDescription(
//                             "Пользователю уже имеет ограничение в голосовых и текстовых каналах."
//                         )
//                         .setAuthor({
//                             name: "Ограничение доступа",
//                         })
//                         .setFooter({
//                             text: interaction.member.displayName,
//                             iconURL: interaction.member.displayAvatarURL({
//                                 forceStatic: false,
//                             }),
//                         }),
//                 ],
//             });
//         if (interaction.member.id === user.id)
//             return await interaction.reply({
//                 embeds: [
//                     new ExtendedEmbed()
//                         .setDescription("Вы не можете ограничить доступ себе.")
//                         .setAuthor({
//                             name: "Ограничение доступа",
//                         })
//                         .setFooter({
//                             text: interaction.member.displayName,
//                             iconURL: interaction.member.displayAvatarURL({
//                                 forceStatic: false,
//                             }),
//                         }),
//                 ],
//             });
//         if (interaction.member.roles.cache.highest.position >= )
//     },
// });
