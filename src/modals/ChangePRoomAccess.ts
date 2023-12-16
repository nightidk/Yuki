import { ExtendedInteraction } from "./../typings/Command";
import {
    ActionRowBuilder,
    GuildMember,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import { Modal } from "../structures/Modal";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";

let components = new Array(
    new ActionRowBuilder().addComponents(
        new TextInputBuilder()
            .setCustomId("user")
            .setLabel("ID пользователя")
            .setMaxLength(20)
            .setMinLength(15)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "proom_changeAccess";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Выдача/отзыв доступа пользователю");

        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
        let member = interaction.member as GuildMember;
        let room = await getRoom(member.voice.channelId);
        if (!room) {
            await interaction
                .reply({
                    content: "Ты должен находится в приватной комнате.",
                    ephemeral: true,
                    components: [],
                })
                .catch(() => {});
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
                    if (
                        interaction.member.voice.channel
                            .permissionsFor(user)
                            .has("Connect")
                    ) {
                        await interaction.member.voice.channel.permissionOverwrites.edit(
                            user,
                            { Connect: false }
                        );
                        if (
                            user.voice.channelId ===
                            interaction.member.voice.channelId
                        ) {
                            await user.edit({
                                channel: null,
                            });
                            await interaction
                                .reply({
                                    content: `У пользователю ${user} было отозвано разрешение на заход в вашу приватную комнату, а так же он был изгнан из неё.`,
                                    ephemeral: true,
                                    components: [],
                                })
                                .catch(() => {});
                        } else {
                            await interaction
                                .reply({
                                    content: `У пользователю ${user} было отозвано разрешение на заход в вашу приватную комнату.`,
                                    ephemeral: true,
                                    components: [],
                                })
                                .catch(() => {});
                        }
                    } else {
                        await interaction.member.voice.channel.permissionOverwrites.edit(
                            user,
                            { Connect: true }
                        );
                        await interaction
                            .reply({
                                content: `Пользователю ${user} было выдано разрешение на заход в вашу приватную комнату.`,
                                ephemeral: true,
                                components: [],
                            })
                            .catch(() => {});
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
                    .catch(() => {});
            });
    },
});
