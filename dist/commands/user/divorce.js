"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Embed_1 = require("./../../structures/Embed");
const Command_1 = require("./../../structures/Command");
const User_1 = tslib_1.__importDefault(require("../../schemas/User"));
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "divorce",
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    description: "Покинуть семью",
    run: async ({ client, interaction, args }) => {
        const user = args.getMember("user");
        const memberDB = await User_1.default.findOne({ userId: interaction.member.id });
        if (!memberDB.marry.married)
            return await interaction.reply({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setDescription("Ты и так не состоишь в семье.")
                        .setFooter({
                        text: interaction.member.displayName,
                        iconURL: interaction.member.displayAvatarURL({
                            forceStatic: false,
                        }),
                    }),
                ],
            });
        await interaction.reply({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setDescription(`${interaction.member} покинул свою семью.`)
                    .setFooter({
                    text: interaction.member.displayName,
                    iconURL: interaction.member.displayAvatarURL({
                        forceStatic: false,
                    }),
                })
                    .setAuthor({ name: "Выход из семьи" }),
            ],
        });
        await User_1.default.updateOne({
            userId: memberDB.marry.partner,
        }, {
            $set: {
                "marry.married": false,
            },
            $unset: {
                "marry.partner": null,
                "marry.typeMarry": null,
                "marry.marryDate": null,
            },
        });
        await User_1.default.updateOne({
            userId: interaction.member.id,
        }, {
            $set: {
                "marry.married": false,
            },
            $unset: {
                "marry.partner": null,
                "marry.typeMarry": null,
                "marry.marryDate": null,
            },
        });
    },
});
