"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const customId = "verifyStep3";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Далее");
        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new Embed_1.ExtendedEmbed().setTimestamp(null).setDescription(`Учтено.
Выберите Вашу принадлежность к фракции, информация доступна в канале <#1125432319059185845>`),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.StringSelectMenuBuilder()
                    .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                    .setLabel("Район 4-Хикари")
                    .setValue("4-hikari"), new discord_js_1.StringSelectMenuOptionBuilder()
                    .setLabel("Золотой город Син")
                    .setValue("goldCitySin"), new discord_js_1.StringSelectMenuOptionBuilder()
                    .setLabel("Портовый Тансю")
                    .setValue("tansu"), new discord_js_1.StringSelectMenuOptionBuilder()
                    .setLabel("Окраины Кен-Гетто")
                    .setValue("ken-getto"))
                    .setCustomId("verifyStep3Fracture")),
            ],
        });
        const selectMenuFracture = interaction.channel.createMessageComponentCollector({
            componentType: discord_js_1.ComponentType.StringSelect,
            time: 300000,
            filter: (i) => i.member.id === interaction.member.id &&
                i.channelId === interaction.channelId &&
                i.customId === "verifyStep3Fracture",
        });
        selectMenuFracture.on("collect", async (i) => {
            selectMenuFracture.stop("collected");
            if (!interaction.member.roles.cache.has("1125108934915653703") &&
                !interaction.member.roles.cache.has("1125109766222524537") &&
                !interaction.member.roles.cache.has("1125109853136896090") &&
                !interaction.member.roles.cache.has("1125110023144624178"))
                switch (i.values[0]) {
                    case "4-hikari":
                        await interaction.member.roles.add("1125108934915653703");
                        break;
                    case "goldCitySin":
                        await interaction.member.roles.add("1125109766222524537");
                        break;
                    case "tansu":
                        await interaction.member.roles.add("1125109853136896090");
                        break;
                    case "ken-getto":
                        await interaction.member.roles.add("1125110023144624178");
                        break;
                }
            await i.update({
                embeds: [
                    new Embed_1.ExtendedEmbed()
                        .setTimestamp(null)
                        .setDescription(`- Доступ разрешен. Начислено 240 минут. По истечению данного времени вы будете стерты "Системой". 
- $#%#%%$#&$
- Для поддержания вашей жизни учавствуйте в работах на благо "Системы"

Тяжелые ворота с грохотом распахиваются...`)
                        .setImage("https://media.discordapp.net/attachments/786930042265272330/1125468406691405874/Kandinsky_2.1_1.jpg?width=1352&height=676"),
                ],
                components: [],
            });
            await interaction.member.roles.add("1125080526391349348");
            await interaction.member.roles.remove("1125856938379452577");
        });
    },
});
