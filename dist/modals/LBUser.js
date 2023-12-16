"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const User_1 = tslib_1.__importDefault(require("../schemas/User"));
const LocalBan_1 = tslib_1.__importDefault(require("../schemas/LocalBan"));
let components = new Array(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("userId")
    .setLabel("ID пользователя")
    .setMaxLength(20)
    .setMinLength(15)
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Short)), new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("reason")
    .setLabel("Причина")
    .setMinLength(1)
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Paragraph)));
const customId = "mod_lb";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Локальная блокировка");
        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
        let user = await interaction.guild.members
            .fetch({ user: args.getTextInputValue("userId") })
            .catch(() => { });
        let reason = args.getTextInputValue("reason");
        if (!user)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new Embed_1.ExtendedEmbed(false)
                        .setDescription("Пользователь не найден.")
                        .setAuthor({ name: "Локальная блокировка" }),
                ],
            });
        let localbanDB = await LocalBan_1.default.findOne({ userId: user.id });
        if (localbanDB)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription("Пользователь уже находится в локальной блокировке.")
                        .setAuthor({
                        name: "Локальная блокировка",
                    })
                        .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
        await LocalBan_1.default.create({
            userId: user.id,
            reason: reason,
            modId: interaction.member.id,
        });
        await User_1.default.updateOne({ userId: user.id }, {
            $push: {
                punishments: {
                    type: "lb",
                    reason: reason,
                    modId: interaction.member.id,
                    date: new Date(),
                },
            },
        });
        user.roles.cache.forEach(async (r) => {
            if (!user)
                return;
            await user.roles.remove(r.id).catch(() => { });
        });
        await user.roles.add("1125179117415968878").catch(() => { });
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`Пользователю ${user} выдана локальная блокировка.\nПричина: **${reason}**`)
                    .setAuthor({
                    name: "Локальная блокировка",
                }),
            ],
        });
        let logChannel = interaction.guild.channels.cache.get("1125116171247685693");
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`Пользователю ${user} выдана локальная блокировка.\nПричина: **${reason}**`)
                    .setAuthor({
                    name: "Локальная блокировка",
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
