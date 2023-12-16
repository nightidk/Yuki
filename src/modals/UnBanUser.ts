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
import { deleteMute, getRoom } from "../functions/DatabaseFunctions";
import { ExtendedEmbed } from "../structures/Embed";
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
    ) as ActionRowBuilder<TextInputBuilder>
);

const customId = "mod_unban";

export default new Modal({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    showModal: async (interaction: ExtendedInteraction) => {
        let modal = new ModalBuilder();
        modal.setCustomId(customId);
        modal.setComponents(components);
        modal.setTitle("Разблокировка");

        await interaction.showModal(modal);
    },
    run: async ({ client, interaction, args }) => {
        let user = await client.users
            .fetch(args.getTextInputValue("userId"))
            .catch(() => {});

        if (!user)
            return await interaction.reply({
                ephemeral: true,
                embeds: [
                    new ExtendedEmbed(false)
                        .setDescription("Пользователь не найден.")
                        .setAuthor({ name: "Разлокировка" }),
                ],
            });

        await interaction.guild.bans.remove(user);

        await User.updateOne(
            { userId: user.id },
            {
                $push: {
                    punishments: {
                        type: "unban",
                        modId: interaction.member.id,
                        date: new Date(),
                    },
                },
            }
        );

        await interaction.reply({
            ephemeral: true,
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        `Пользователю ${user} выдана разблокировка.`
                    )
                    .setAuthor({
                        name: "Разблокировка",
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
                        `Пользователю ${user} выдана разблокировка.`
                    )
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
