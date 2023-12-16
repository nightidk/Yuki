"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Modal_1 = require("../structures/Modal");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
let components = new Array(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
    .setCustomId("user")
    .setLabel("ID пользователя")
    .setMaxLength(20)
    .setMinLength(15)
    .setRequired(true)
    .setStyle(discord_js_1.TextInputStyle.Short)));
const customId = "proom_changeAccess";
exports.default = new Modal_1.Modal({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction) => {
        let modal = new discord_js_1.ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Выдача/отзыв доступа пользователю");
        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
        let member = interaction.member;
        let room = await (0, DatabaseFunctions_1.getRoom)(member.voice.channelId);
        if (!room) {
            await interaction
                .reply({
                content: "Ты должен находится в приватной комнате.",
                ephemeral: true,
                components: [],
            })
                .catch(() => { });
            return;
        }
        if (room.ownerId !== member.id) {
            await interaction.reply({
                content: "Ты не являешься владельцом данной комнаты.",
                ephemeral: true,
                components: [],
            });
            return;
        }
        interaction.guild.members
            .fetch(args.getTextInputValue("user"))
            .then(async (user) => {
            if (user.id === room.ownerId)
                await interaction.reply({
                    content: "Ты являешься владельцом данной комнаты.",
                    ephemeral: true,
                    components: [],
                });
            else {
                if (interaction.member.voice.channel
                    .permissionsFor(user)
                    .has("Connect")) {
                    await interaction.member.voice.channel.permissionOverwrites.edit(user, { Connect: false });
                    if (user.voice.channelId ===
                        interaction.member.voice.channelId) {
                        await user.edit({
                            channel: null,
                        });
                        await interaction
                            .reply({
                            content: `У пользователю ${user} было отозвано разрешение на заход в вашу приватную комнату, а так же он был изгнан из неё.`,
                            ephemeral: true,
                            components: [],
                        })
                            .catch(() => { });
                    }
                    else {
                        await interaction
                            .reply({
                            content: `У пользователю ${user} было отозвано разрешение на заход в вашу приватную комнату.`,
                            ephemeral: true,
                            components: [],
                        })
                            .catch(() => { });
                    }
                }
                else {
                    await interaction.member.voice.channel.permissionOverwrites.edit(user, { Connect: true });
                    await interaction
                        .reply({
                        content: `Пользователю ${user} было выдано разрешение на заход в вашу приватную комнату.`,
                        ephemeral: true,
                        components: [],
                    })
                        .catch(() => { });
                }
            }
        })
            .catch(async () => {
            await interaction
                .reply({
                content: `Пользователь не найден.`,
                ephemeral: true,
                components: [],
            })
                .catch(() => { });
        });
    },
});
