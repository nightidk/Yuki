"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Embed_1 = require("./../structures/Embed");
const __1 = require("..");
const Event_1 = require("../structures/Event");
const userPermissions_1 = require("../typings/userPermissions");
exports.default = new Event_1.Event("interactionCreate", async (interaction) => {
    let model = __1.client.db.modelsDB.get("Lunix");
    const lunixConfig = await model.findOne();
    // Chat Input Commands
    if (interaction.isCommand()) {
        const command = __1.client.commands.get(interaction.commandName);
        if (!command)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed().setDescription("Ты наткнулся на не существующую команду o.o"),
                ],
                ephemeral: true,
            });
        if (command.userPermissions === userPermissions_1.userPermissions.DISABLED)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed().setDescription("Эта команда отключена."),
                ],
                ephemeral: true,
            });
        if (command.userPermissions === userPermissions_1.userPermissions.BOOST)
            if (!interaction.member.roles.cache.get(interaction.guild.roles.premiumSubscriberRole.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription(`Эта команда доступна только для пользователей с ролью ${interaction.guild.roles.premiumSubscriberRole}`),
                    ],
                    ephemeral: true,
                });
        if (command.userPermissions === userPermissions_1.userPermissions.BETA)
            if (!lunixConfig.BETA_USERS.includes(interaction.user.id) &&
                !lunixConfig.DEVELOPERS.includes(interaction.user.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Эта команда находится в бета доступе."),
                    ],
                    ephemeral: true,
                });
        if (command.userPermissions === userPermissions_1.userPermissions.DEVELOPER)
            if (!lunixConfig.DEVELOPERS.includes(interaction.user.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Эта команда доступна только для разработчиков."),
                    ],
                    ephemeral: true,
                });
        command.run({
            args: interaction.options,
            client: __1.client,
            interaction: interaction,
        });
    }
    // Modals
    else if (interaction.isModalSubmit()) {
        let modal = __1.client.modals.get(interaction.customId);
        if (!modal)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed().setDescription("Ты наткнулся на не существующую модельку o.o"),
                ],
                ephemeral: true,
            });
        modal.run({
            args: interaction.fields,
            client: __1.client,
            interaction: interaction,
        });
    }
    // Buttons
    else if (interaction.isButton()) {
        let tempButton = __1.client.tempButtons.some((messageId) => messageId === interaction.message.id);
        if (tempButton)
            return;
        let button = __1.client.buttons.get(interaction.customId);
        if (!button)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed().setDescription("Ты наткнулся на не существующую кнопочку o.o"),
                ],
                ephemeral: true,
            });
        if (button.userPermissions === userPermissions_1.userPermissions.DISABLED)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed().setDescription("Эта команда отключена."),
                ],
                ephemeral: true,
            });
        if (button.userPermissions === userPermissions_1.userPermissions.BOOST)
            if (!interaction.member.roles.cache.get(interaction.guild.roles.premiumSubscriberRole.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription(`Эта команда доступна только для пользователей с ролью ${interaction.guild.roles.premiumSubscriberRole}`),
                    ],
                    ephemeral: true,
                });
        if (button.userPermissions === userPermissions_1.userPermissions.BETA)
            if (!lunixConfig.BETA_USERS.includes(interaction.user.id) &&
                !lunixConfig.DEVELOPERS.includes(interaction.user.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Эта команда находится в бета доступе."),
                    ],
                    ephemeral: true,
                });
        if (button.userPermissions === userPermissions_1.userPermissions.DEVELOPER)
            if (!lunixConfig.DEVELOPERS.includes(interaction.user.id))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Эта команда доступна только для разработчиков."),
                    ],
                    ephemeral: true,
                });
        if (button.userPermissions === userPermissions_1.userPermissions.MODERATION)
            if (!interaction.member.roles.cache.has("1125481057211404309") &&
                !interaction.member.roles.cache.has("1125100646878691449") &&
                !interaction.member.roles.cache.has("1125181290505834576") &&
                !interaction.member.roles.cache.has("1125113774030995476") &&
                !interaction.member.roles.cache.has("1125118367892787232") &&
                !interaction.member.permissions.has("Administrator"))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Недостаточно прав."),
                    ],
                    ephemeral: true,
                });
        if (button.userPermissions === userPermissions_1.userPermissions.MANAGER)
            if (!interaction.member.roles.cache.has("1125181290505834576") &&
                !interaction.member.roles.cache.has("1125113774030995476") &&
                !interaction.member.roles.cache.has("1125118367892787232") &&
                !interaction.member.permissions.has("Administrator"))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Недостаточно прав."),
                    ],
                    ephemeral: true,
                });
        if (button.userPermissions === userPermissions_1.userPermissions.CURATOR)
            if (!interaction.member.roles.cache.has("1125118367892787232") &&
                !interaction.member.permissions.has("Administrator"))
                return await interaction.reply({
                    embeds: [
                        new Embed_1.ExtendedEmbed().setDescription("Недостаточно прав."),
                    ],
                    ephemeral: true,
                });
        button.run({
            client: __1.client,
            interaction: interaction,
        });
    }
});
