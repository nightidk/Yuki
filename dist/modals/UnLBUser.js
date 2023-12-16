"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
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
const customId = "mod_unlb";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Снятие локальной блокировки");
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
                        .setAuthor({ name: "Снятие локальной блокировки" }),
                ],
            });
        let localbanDB = await LocalBan_1.default.findOne({ userId: user.id });
        if (!localbanDB)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription("Пользователь не находится в локальной блокировке.")
                        .setAuthor({
                        name: "Снятие локальной блокировки",
                    })
                        .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
        await (0, DatabaseFunctions_1.deleteLB)(user.id);
        await User_1.default.updateOne({ userId: user.id }, {
            $push: {
                punishments: {
                    type: "unlb",
                    reason: reason,
                    modId: interaction.member.id,
                    date: new Date(),
                },
            },
        });
        await user.roles.remove("1125179117415968878").catch(() => { });
        await user.roles.add("1125856938379452577").catch(() => { });
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`С пользователя ${user} снята локальная блокировка.\nПричина: **${reason}**`)
                    .setAuthor({
                    name: "Снятие локальной блокировки",
                }),
            ],
        });
        let logChannel = interaction.guild.channels.cache.get("1125116171247685693");
        await logChannel.send({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`С пользователя ${user} снята локальная блокировка.\nПричина: **${reason}**`)
                    .setAuthor({
                    name: "Снятие локальной блокировки",
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
