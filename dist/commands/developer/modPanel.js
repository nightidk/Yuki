"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const Embed_1 = require("../../structures/Embed");
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "setup-mp",
    description: "Setup MP",
    userPermissions: userPermissions_1.userPermissions.DEVELOPER,
    options: [
        new discord_js_1.SlashCommandChannelOption()
            .setName("channel")
            .setDescription("Channel to setup MP in")
            .setRequired(true),
    ],
    run: async ({ interaction, args, client }) => {
        const channel = args.getChannel("channel", true);
        if (!channel)
            return interaction.reply({
                content: "Channel not found",
                ephemeral: true,
            });
        await channel.send({
            embeds: [
                new Embed_1.ExtendedEmbed(false)
                    .setTimestamp(null)
                    .setAuthor({ name: "Панель модерации" })
                    .setDescription(`## <:warnings:1130994423388442654> ПРЕДУПРЕЖДЕНИЕ\n\n- Мы хотим обратить ваше внимание на ответственность, связанную с использованием панели модерации. Панель модерации предоставляет уникальные возможности для поддержания порядка и контроля на нашем сервере, но с этими возможностями приходит и особая ответственность.\n- Пожалуйста, помните, что каждое действие, совершенное с помощью панели модерации, может иметь серьезные последствия для участников сервера. Перед тем как применять какие-либо меры, убедитесь, что они справедливы, обоснованы и соответствуют правилам и нормам, установленным для нашего сервера.\n- Мы призываем вас использовать панель модерации с соблюдением высоких стандартов этики и справедливости. Не злоупотребляйте своими правами и не принимайте решения на основе личных предубеждений или эмоций. Всегда старайтесь быть объективными и рассудительными.\n- Если у вас возникают сомнения или нужна помощь в принятии решений, не стесняйтесь проконсультироваться с администрацией. Мы всегда готовы поддержать вас и предоставить рекомендации в сложных ситуациях.\n- Помните, что ваша роль модератора заключается не только в приведении порядка, но также в создании дружественной и безопасной обстановки для всех участников. Действуйте с уважением и терпимостью, и помните, что ваше поведение служит примером для других пользователей сервера.\n\n- **При использовании любого инструмента из панели модерации, вы соглашаетесь, что прочли информацию выше.**`)
                    .setImage("https://media.discordapp.net/attachments/666234650758348820/996850997450244168/e3cfe1b9bed20d99.png"),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("mod_mute").build(), client.buttons.get("mod_unmute").build()),
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("mod_lb").build(), client.buttons.get("mod_unlb").build()),
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("mod_ban").build(), client.buttons.get("mod_unban").build()),
            ],
        });
        await interaction.reply({
            content: `Mod panel linked to ${channel}`,
            ephemeral: true,
        });
    },
});
