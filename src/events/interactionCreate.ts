import { ExtendedEmbed } from "./../structures/Embed";
import {
    ExtendedCommandInteraction,
    ExtendedInteraction,
} from "./../typings/Command";
import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { userPermissions } from "../typings/userPermissions";
import Lunix from "../schemas/Lunix";
import { ExtendedModalInteraction } from "../typings/Modal";
import { ExtendedButtonInteraction } from "../typings/Button";

export default new Event(
    "interactionCreate",
    async (interaction: ExtendedInteraction) => {
        let model = client.db.modelsDB.get("Lunix") as typeof Lunix;
        const lunixConfig = await model.findOne();

        // Chat Input Commands
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command)
                return await interaction.reply({
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "Ты наткнулся на не существующую команду o.o"
                        ),
                    ],
                    ephemeral: true,
                });

            if (command.userPermissions === userPermissions.DISABLED)
                return await interaction.reply({
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "Эта команда отключена."
                        ),
                    ],
                    ephemeral: true,
                });

            if (command.userPermissions === userPermissions.BOOST)
                if (
                    !interaction.member.roles.cache.get(
                        interaction.guild.roles.premiumSubscriberRole.id
                    )
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                `Эта команда доступна только для пользователей с ролью ${interaction.guild.roles.premiumSubscriberRole}`
                            ),
                        ],
                        ephemeral: true,
                    });

            if (command.userPermissions === userPermissions.BETA)
                if (
                    !lunixConfig.BETA_USERS.includes(interaction.user.id) &&
                    !lunixConfig.DEVELOPERS.includes(interaction.user.id)
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Эта команда находится в бета доступе."
                            ),
                        ],
                        ephemeral: true,
                    });

            if (command.userPermissions === userPermissions.DEVELOPER)
                if (!lunixConfig.DEVELOPERS.includes(interaction.user.id))
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Эта команда доступна только для разработчиков."
                            ),
                        ],
                        ephemeral: true,
                    });

            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedCommandInteraction,
            });
        }
        // Modals
        else if (interaction.isModalSubmit()) {
            let modal = client.modals.get(interaction.customId);
            if (!modal)
                return await interaction.reply({
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "Ты наткнулся на не существующую модельку o.o"
                        ),
                    ],
                    ephemeral: true,
                });

            modal.run({
                args: interaction.fields,
                client,
                interaction: interaction as ExtendedModalInteraction,
            });
        }
        // Buttons
        else if (interaction.isButton()) {
            let tempButton = client.tempButtons.some(
                (messageId) => messageId === interaction.message.id
            );
            if (tempButton) return;
            let button = client.buttons.get(interaction.customId);
            if (!button)
                return await interaction.reply({
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "Ты наткнулся на не существующую кнопочку o.o"
                        ),
                    ],
                    ephemeral: true,
                });

            if (button.userPermissions === userPermissions.DISABLED)
                return await interaction.reply({
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "Эта команда отключена."
                        ),
                    ],
                    ephemeral: true,
                });

            if (button.userPermissions === userPermissions.BOOST)
                if (
                    !interaction.member.roles.cache.get(
                        interaction.guild.roles.premiumSubscriberRole.id
                    )
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                `Эта команда доступна только для пользователей с ролью ${interaction.guild.roles.premiumSubscriberRole}`
                            ),
                        ],
                        ephemeral: true,
                    });

            if (button.userPermissions === userPermissions.BETA)
                if (
                    !lunixConfig.BETA_USERS.includes(interaction.user.id) &&
                    !lunixConfig.DEVELOPERS.includes(interaction.user.id)
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Эта команда находится в бета доступе."
                            ),
                        ],
                        ephemeral: true,
                    });

            if (button.userPermissions === userPermissions.DEVELOPER)
                if (!lunixConfig.DEVELOPERS.includes(interaction.user.id))
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Эта команда доступна только для разработчиков."
                            ),
                        ],
                        ephemeral: true,
                    });

            if (button.userPermissions === userPermissions.MODERATION)
                if (
                    !interaction.member.roles.cache.has(
                        "1125481057211404309"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125100646878691449"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125181290505834576"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125113774030995476"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125118367892787232"
                    ) &&
                    !interaction.member.permissions.has("Administrator")
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Недостаточно прав."
                            ),
                        ],
                        ephemeral: true,
                    });

            if (button.userPermissions === userPermissions.MANAGER)
                if (
                    !interaction.member.roles.cache.has(
                        "1125181290505834576"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125113774030995476"
                    ) &&
                    !interaction.member.roles.cache.has(
                        "1125118367892787232"
                    ) &&
                    !interaction.member.permissions.has("Administrator")
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Недостаточно прав."
                            ),
                        ],
                        ephemeral: true,
                    });

            if (button.userPermissions === userPermissions.CURATOR)
                if (
                    !interaction.member.roles.cache.has(
                        "1125118367892787232"
                    ) &&
                    !interaction.member.permissions.has("Administrator")
                )
                    return await interaction.reply({
                        embeds: [
                            new ExtendedEmbed().setDescription(
                                "Недостаточно прав."
                            ),
                        ],
                        ephemeral: true,
                    });

            button.run({
                client,
                interaction: interaction as ExtendedButtonInteraction,
            });
        }
    }
);
