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
import { deleteLB, deleteMute, getRoom } from "../functions/DatabaseFunctions";
import { ExtendedEmbed } from "../structures/Embed";
import User from "../schemas/User";
import LocalBan from "../schemas/LocalBan";

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
            .setCustomId("reason")
            .setLabel("Причина")
            .setMinLength(1)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "mod_unlb";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Снятие локальной блокировки");

        await interaction.showModal(modal);
    },
    run: async ({ interaction, args }) => {
        let user = await interaction.guild.members
            .fetch({ user: args.getTextInputValue("userId") })
            .catch(() => {});
        let reason = args.getTextInputValue("reason");

        if (!user)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed(false)
                        .setDescription("Пользователь не найден.")
                        .setAuthor({ name: "Снятие локальной блокировки" }),
                ],
            });

        let localbanDB = await LocalBan.findOne({ userId: user.id });

        if (!localbanDB)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed()
                        .setDescription(
                            "Пользователь не находится в локальной блокировке."
                        )
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

        await deleteLB(user.id);

        await User.updateOne(
            { userId: user.id },
            {
                $push: {
                    punishments: {
                        type: "unlb",
                        reason: reason,
                        modId: interaction.member.id,
                        date: new Date(),
                    },
                },
            }
        );

        await user.roles.remove("1125179117415968878").catch(() => {});
        await user.roles.add("1125856938379452577").catch(() => {});

        await interaction.reply({
            ephemeral: true,
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        `С пользователя ${user} снята локальная блокировка.\nПричина: **${reason}**`
                    )
                    .setAuthor({
                        name: "Снятие локальной блокировки",
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
                        `С пользователя ${user} снята локальная блокировка.\nПричина: **${reason}**`
                    )
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
