import { ExtendedInteraction } from "./../typings/Command";
import {
    ActionRowBuilder,
    ComponentType,
    ModalBuilder,
    TextChannel,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import { Modal } from "../structures/Modal";
import { userPermissions } from "../typings/userPermissions";
import { getRoom } from "../functions/DatabaseFunctions";
import {
    convertStringTimeToSeconds,
    getTimeMute,
    getTimestamp,
} from "../functions/CommandFunctions";
import { ExtendedEmbed } from "../structures/Embed";
import Mute from "../schemas/Mute";
import User from "../schemas/User";

let components = new Array(
    new ActionRowBuilder().addComponents(
        new TextInputBuilder()
            .setCustomId("userId")
            .setLabel("ID пользователя")
            .setMaxLength(20)
            .setMinLength(15)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
    ) as ActionRowBuilder<TextInputBuilder>,
    new ActionRowBuilder().addComponents(
        new TextInputBuilder()
            .setCustomId("time")
            .setLabel("Время ограничения")
            .setPlaceholder("Пример: 1ч5м")
            .setMinLength(2)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
    ) as ActionRowBuilder<TextInputBuilder>,
    new ActionRowBuilder().addComponents(
        new TextInputBuilder()
            .setCustomId("reason")
            .setLabel("Причина")
            .setMinLength(1)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "mod_mute";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Ограничение доступа");

        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
        let user = await interaction.guild.members
            .fetch({ user: args.getTextInputValue("userId") })
            .catch(() => {});
        let time = convertStringTimeToSeconds(args.getTextInputValue("time"));
        let reason = args.getTextInputValue("reason");

        if (!user)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed(false)
                        .setDescription("Пользователь не найден.")
                        .setAuthor({ name: "Ограничение доступа" }),
                ],
            });

        if (time <= 0)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed(false)
                        .setDescription("Время блокировки должно быть больше 0")
                        .setAuthor({ name: "Ограничение доступа" }),
                ],
            });

        let muteDB = await Mute.findOne({ userId: user.id });

        if (muteDB)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            "Пользователь уже имеет ограничение в голосовых и текстовых каналах."
                        )
                        .setAuthor({
                            name: "Ограничение доступа",
                        })
                        .setFooter({
                            text: interaction.member.displayName,
                            iconURL: interaction.member.displayAvatarURL({
                                forceStatic: false,
                            }),
                        }),
                ],
            });

        await Mute.create({
            userId: user.id,
            modId: interaction.member.id,
            reason: reason,
            timestampEnd: getTimestamp() + time,
        });

        await User.updateOne(
            { userId: user.id },
            {
                $push: {
                    punishments: {
                        type: "mute",
                        time: time,
                        reason: reason,
                        modId: interaction.member.id,
                        date: new Date(),
                    },
                },
            }
        );

        await user.roles.add("1125191372501176373").catch(() => {});

        await interaction.reply({
            ephemeral: true,
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        `Пользователю ${user} ограничен доступ на ${getTimeMute(
                            time
                        )}.\nПричина: **${reason}**\nВремя разблокировки: <t:${
                            getTimestamp() + time
                        }:f>`
                    )
                    .setAuthor({
                        name: "Ограничение доступа",
                    }),
            ],
        });

        let logChannel = interaction.guild.channels.cache.get(
            "1125116171247685693"
        ) as TextChannel;

        await logChannel.send({
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        `Пользователю ${user} ограничен доступ на ${getTimeMute(
                            time
                        )}.\nПричина: **${reason}**\nВремя разблокировки: <t:${
                            getTimestamp() + time
                        }:f>`
                    )
                    .setAuthor({
                        name: "Ограничение доступа",
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
