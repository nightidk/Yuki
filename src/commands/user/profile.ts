import { createCanvas, loadImage, registerFont } from "canvas";
import {
    AttachmentBuilder,
    GuildMember,
    SlashCommandUserOption,
} from "discord.js";
import { Command } from "../../structures/Command";
import { userPermissions } from "../../typings/userPermissions";
import { ExtendedEmbed } from "../../structures/Embed";
import {
    getAvatar,
    getLevelExp,
    getStringDate,
    getTime,
    getTimeBalance,
    roundRect,
} from "../../functions/CommandFunctions";
import { getUser } from "../../functions/DatabaseFunctions";

export default new Command({
    name: "profile",
    description: "Профиль пользователя",
    userPermissions: userPermissions.DEFAULT,
    options: [
        new SlashCommandUserOption()
            .setName("user")
            .setDescription(
                "Пользователь, профиль которого ты хочешь посмотреть"
            )
            .setRequired(false),
    ],
    run: async ({ interaction, args }) => {
        const member =
            (args.getMember("user") as GuildMember) || interaction.member;

        const userDB = await getUser(member.id);

        if (
            !member.roles.cache.has("1125888088456040580") &&
            !member.roles.cache.has("1125108934915653703") &&
            !member.roles.cache.has("1125109766222524537") &&
            !member.roles.cache.has("1125109853136896090") &&
            !member.roles.cache.has("1125110023144624178")
        )
            if (member.id === interaction.member.id)
                return await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "У тебя не найдена роль фракции! Пожалуйста, обратись к администратору для выдачи."
                        ),
                    ],
                });
            else
                return await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new ExtendedEmbed().setDescription(
                            "У данного пользователя не найдена роль фракции!"
                        ),
                    ],
                });

        const msg = await interaction.reply({
            embeds: [
                new ExtendedEmbed()
                    .setDescription(
                        "Система генерирует профиль. Пожалуйста, подождите немного..."
                    )
                    .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
            ],
            fetchReply: true,
        });

        registerFont(`${__dirname}/../../fonts/ProximaNova-Bold.ttf`, {
            family: "Proxima Nova Bold",
        });
        registerFont(`${__dirname}/../../fonts/lcdnova.ttf`, {
            family: "a_LCDNova",
        });

        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext("2d");
        let background;

        if (member.roles.cache.has("1125888088456040580"))
            background = await loadImage(
                `${__dirname}/../../assets/profile/hub.png`
            );
        else if (member.roles.cache.has("1125108934915653703"))
            background = await loadImage(
                `${__dirname}/../../assets/profile/4hikari.png`
            );
        else if (member.roles.cache.has("1125109766222524537"))
            background = await loadImage(
                `${__dirname}/../../assets/profile/sin.png`
            );
        else if (member.roles.cache.has("1125109853136896090"))
            background = await loadImage(
                `${__dirname}/../../assets/profile/tansu.png`
            );
        else if (member.roles.cache.has("1125110023144624178"))
            background = await loadImage(
                `${__dirname}/../../assets/profile/ken_getto.png`
            );

        ctx.drawImage(background, 0, 0);

        const memberAvatar = await getAvatar(
            member.displayAvatarURL({
                forceStatic: true,
                extension: "png",
                size: 256,
            })
        );

        ctx.drawImage(memberAvatar, 150, 211, 247, 247);

        if (!userDB.marry.married) {
            ctx.drawImage(
                await loadImage(
                    `${__dirname}/../../assets/profile/modules/block_heart.png`
                ),
                837,
                837
            );
            ctx.font = "41px Proxima Nova Bold";
            ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
            ctx.fillText("—", 1065, 745);
            ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
            ctx.fillText("Alone", 732, 747);
        } else {
            const partner = await interaction.guild.members
                .fetch({
                    user: userDB.marry.partner,
                })
                .catch(() => {});
            if (partner) {
                const partnerAvatar = await getAvatar(
                    partner.displayAvatarURL({
                        forceStatic: true,
                        extension: "png",
                        size: 128,
                    })
                );
                ctx.drawImage(partnerAvatar, 620, 826, 100, 100);
                ctx.font = "41px Proxima Nova Bold";
                ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
                ctx.fillText(
                    partner.user.username.length > 20
                        ? `${partner.user.username.slice(0, 20)}...`
                        : partner.user.username,
                    750,
                    864
                );
                const days = `${Math.floor(
                    (new Date().getTime() - userDB.marry.marryDate.getTime()) /
                        1000 /
                        (3600 * 24)
                )} дн.`;

                ctx.font = "30px Proxima Nova Bold";
                ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
                const daysMeasure = ctx.measureText(days);
                ctx.fillText(days, 1083 - daysMeasure.width, 745);

                ctx.font = "41px Proxima Nova Bold";
                ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
                ctx.fillText(
                    userDB.marry.typeMarry === "dating" ? "Dating" : "Married",
                    732,
                    747
                );

                ctx.fillStyle = "rgba(255, 255, 255, 0.61)";
                const date = getStringDate(userDB.marry.marryDate);
                ctx.fillText(date, 750, 914);
            } else {
                ctx.drawImage(
                    await loadImage(
                        `${__dirname}/../../assets/profile/modules/block_heart.png`
                    ),
                    837,
                    837
                );
                const days = `${Math.floor(
                    (new Date().getTime() - userDB.marry.marryDate.getTime()) /
                        1000 /
                        (3600 * 24)
                )} дн.`;

                ctx.font = "30px Proxima Nova Bold";
                ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
                const daysMeasure = ctx.measureText(days);
                ctx.fillText(days, 1083 - daysMeasure.width, 745);

                ctx.font = "41px Proxima Nova Bold";
                ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
                ctx.fillText(
                    userDB.marry.typeMarry === "dating" ? "Dating" : "Married",
                    732,
                    747
                );
            }
        }
        ctx.drawImage(
            await loadImage(
                `${__dirname}/../../assets/profile/modules/block_guild.png`
            ),
            1502,
            837
        );

        ctx.font = "85px a_LCDNova";
        if (member.roles.cache.has("1125888088456040580"))
            ctx.fillStyle = "#FFFFFF";
        else if (member.roles.cache.has("1125108934915653703"))
            ctx.fillStyle = "#D08947";
        else if (member.roles.cache.has("1125109766222524537"))
            ctx.fillStyle = "#D0BA47";
        else if (member.roles.cache.has("1125109853136896090"))
            ctx.fillStyle = "#47D0C8";
        else if (member.roles.cache.has("1125110023144624178"))
            ctx.fillStyle = "#D04747";
        ctx.fillText(getTimeBalance(userDB.balance), 1391, 408);

        ctx.font = "53px Proxima Nova Bold";
        ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
        ctx.fillText(
            member.user.username.length > 20
                ? `${member.user.username.slice(0, 20)}...`
                : member.user.username,
            535,
            271
        );

        ctx.font = "66px Proxima Nova Bold";
        ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
        const level = userDB.level.now;
        const levelMeasure = ctx.measureText(level.toString());
        ctx.fillText(level.toString(), 750 - levelMeasure.width, 447);

        ctx.font = "41px Proxima Nova Bold";
        ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
        ctx.fillText(level.toString(), 535, 414);
        const nextLevel = level + 1;
        const nextLevelMeasure = ctx.measureText(nextLevel.toString());
        ctx.fillText(nextLevel.toString(), 1121 - nextLevelMeasure.width, 414);

        roundRect(
            ctx,
            535,
            347,
            Number(
                (
                    586 *
                    (Number(
                        (100 / (getLevelExp(level) / userDB.level.xp)).toFixed(
                            2
                        )
                    ) /
                        100)
                ).toFixed(2)
            ),
            17,
            12.5
        );
        if (member.roles.cache.has("1125888088456040580"))
            ctx.fillStyle = "#C5C5C5";
        else if (member.roles.cache.has("1125108934915653703"))
            ctx.fillStyle = "#D37015";
        else if (member.roles.cache.has("1125109766222524537"))
            ctx.fillStyle = "#A89808";
        else if (member.roles.cache.has("1125109853136896090"))
            ctx.fillStyle = "#08A8A8";
        else if (member.roles.cache.has("1125110023144624178"))
            ctx.fillStyle = "#A80808";
        ctx.fill();

        ctx.font = "30px Proxima Nova Bold";
        ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
        const timeInVoice = getTime(userDB.stats.voiceActive.all);
        const timeInVoiceMeasure = ctx.measureText(timeInVoice);
        ctx.fillText(timeInVoice, 498 - timeInVoiceMeasure.width, 664);
        const messagesInChat = userDB.stats.chatActive.all.toString();
        const messagesInChatMeasure = ctx.measureText(messagesInChat);
        ctx.fillText(messagesInChat, 498 - messagesInChatMeasure.width, 739);

        ctx.font = "41px Proxima Nova Bold";
        ctx.fillStyle = "rgba(255, 255, 255, 0.33)";
        ctx.fillText("Нет гильдии", 1396, 683);
        ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
        ctx.fillText("—", 253, 908);
        ctx.fillText("—", 1397, 726);

        await msg.edit({
            embeds: [],
            files: [
                new AttachmentBuilder(canvas.toBuffer(), {
                    name: `profile_${member.id}.png`,
                }),
            ],
        });
    },
});
