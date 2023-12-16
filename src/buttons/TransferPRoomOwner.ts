import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    GuildMember,
    MessageActionRowComponentBuilder,
    UserSelectMenuBuilder,
    VoiceChannel,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { getRoom, setRoomOwner } from "../functions/DatabaseFunctions";

const customId = "proom_transferOwner";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setEmoji("<:pfavorite:971831753033539634>");

        return button;
    },
    run: async ({ client, interaction }) => {
        let room = await getRoom(interaction.member.voice.channelId);
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
            content:
                "Выберете пользователя, которому вы хотите передать права владения приватной комнатой.",
            components: [
                new ActionRowBuilder().addComponents(
                    new UserSelectMenuBuilder()
                        .setCustomId("proom_userselectUserTransfer")
                        .setMaxValues(1)
                        .setPlaceholder("Пользователи")
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
            fetchReply: true,
            ephemeral: true,
        });

        const userSelectInteraction =
            interaction.channel.createMessageComponentCollector({
                componentType: ComponentType.UserSelect,
                time: 60000,
                filter: (i) =>
                    i.customId == "proom_userselectUserTransfer" &&
                    i.channelId == interaction.channelId &&
                    i.member.id == interaction.member.id,
            });

        userSelectInteraction.on("collect", async (i) => {
            userSelectInteraction.stop("collected");
            let member = i.member as GuildMember;
            let room = await getRoom(member.voice.channelId);
            if (!room) {
                await interaction
                    .update({
                        content: "Ты должен находится в приватной комнате.",
                        components: [],
                    })
                    .catch(() => {});
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
                            content:
                                "Ты и так являешься владельцом данной комнаты.",
                            components: [],
                        });
                    else if (user.voice?.channelId !== member.voice.channelId)
                        await i.update({
                            content:
                                "Пользователь должен находится в данной комнате.",
                            components: [],
                        });
                    else {
                        await setRoomOwner(
                            member.voice.channelId,
                            user.id,
                            member.voice.channel as VoiceChannel
                        );
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
                        .catch(() => {});
                });
        });

        userSelectInteraction.on("end", async () => {
            if (userSelectInteraction.endReason === "collected") return;
            await interaction
                .update({
                    content: "Время на выбор участника вышло.",
                    components: [],
                })
                .catch(() => {});
        });
    },
});
