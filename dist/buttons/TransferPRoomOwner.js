"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const customId = "proom_transferOwner";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setEmoji("<:pfavorite:971831753033539634>");
        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await (0, DatabaseFunctions_1.getRoom)(interaction.member.voice.channelId);
        if (!room)
            return await interaction.reply({
                content: "Ты должен находится в приватной комнате.",
                ephemeral: true,
            });
        if (room.ownerId !== interaction.member.id)
            return await interaction.reply({
                content: "Ты не являешься владельцом данной комнаты.",
                ephemeral: true,
            });
        await interaction.reply({
            content: "Выберете пользователя, которому вы хотите передать права владения приватной комнатой.",
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.UserSelectMenuBuilder()
                    .setCustomId("proom_userselectUserTransfer")
                    .setMaxValues(1)
                    .setPlaceholder("Пользователи")),
            ],
            fetchReply: true,
            ephemeral: true,
        });
        const userSelectInteraction = interaction.channel.createMessageComponentCollector({
            componentType: discord_js_1.ComponentType.UserSelect,
            time: 60000,
            filter: (i) => i.customId == "proom_userselectUserTransfer" &&
                i.channelId == interaction.channelId &&
                i.member.id == interaction.member.id,
        });
        userSelectInteraction.on("collect", async (i) => {
            userSelectInteraction.stop("collected");
            let member = i.member;
            let room = await (0, DatabaseFunctions_1.getRoom)(member.voice.channelId);
            if (!room) {
                await interaction
                    .update({
                    content: "Ты должен находится в приватной комнате.",
                    components: [],
                })
                    .catch(() => { });
                return;
            }
            if (room.ownerId !== member.id) {
                await i.update({
                    content: "Ты не являешься владельцом данной комнаты.",
                    components: [],
                });
                return;
            }
            i.guild.members
                .fetch(i.values[0])
                .then(async (user) => {
                if (user.id === room.ownerId)
                    await i.update({
                        content: "Ты и так являешься владельцом данной комнаты.",
                        components: [],
                    });
                else if (user.voice?.channelId !== member.voice.channelId)
                    await i.update({
                        content: "Пользователь должен находится в данной комнате.",
                        components: [],
                    });
                else {
                    await (0, DatabaseFunctions_1.setRoomOwner)(member.voice.channelId, user.id, member.voice.channel);
                    await i.update({
                        content: `Права на владение комнатой переданы пользователю ${user}.`,
                        components: [],
                    });
                }
            })
                .catch(async () => {
                await i
                    .update({
                    content: `error`,
                    components: [],
                })
                    .catch(() => { });
            });
        });
        userSelectInteraction.on("end", async () => {
            if (userSelectInteraction.endReason === "collected")
                return;
            await interaction
                .update({
                content: "Время на выбор участника вышло.",
                components: [],
            })
                .catch(() => { });
        });
    },
});
