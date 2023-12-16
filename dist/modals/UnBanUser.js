"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const User_1 = tslib_1.__importDefault(require("../schemas/User"));
let components = new Array(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("userId")
    .setLabel("ID пользователя")
    .setMaxLength(20)
    .setMinLength(15)
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Short)));
const customId = "mod_unban";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Разблокировка");
        await interaction.showModal(modal);
    },
    run: async ({ client, interaction, args }) => {
        let user = await client.users
            .fetch(args.getTextInputValue("userId"))
            .catch(() => { });
        if (!user)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new Embed_1.ExtendedEmbed(false)
                        .setDescription("Пользователь не найден.")
                        .setAuthor({ name: "Разлокировка" }),
                ],
            });
        await interaction.guild.bans.remove(user);
        await User_1.default.updateOne({ userId: user.id }, {
            $push: {
                punishments: {
                    type: "unban",
                    modId: interaction.member.id,
                    date: new Date(),
                },
            },
        });
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`Пользователю ${user} выдана разблокировка.`)
                    .setAuthor({
                    name: "Разблокировка",
                }),
            ],
        });
        let logChannel = interaction.guild.channels.cache.get("1125116171247685693");
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`Пользователю ${user} выдана разблокировка.`)
                    .setAuthor({
                    name: "Разлокировка",
                })
                    .setFooter({
                    text: interaction.member.displayName,
                    iconURL: interaction.member.displayAvatarURL({
                        forceStatic: false,
                    }),
                }),
            ],
        });
    },
});
