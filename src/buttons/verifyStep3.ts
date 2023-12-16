import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    MessageActionRowComponentBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuComponent,
    StringSelectMenuOptionBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "verifyStep3";

export default new Button({
    userPermissions: userPermissions.DEFAULT,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Далее");

        return button;
    },
    run: async ({ client, interaction }) => {
        await interaction.update({
            embeds: [
                new ExtendedEmbed().setTimestamp(null).setDescription(
                    `Учтено.
Выберите Вашу принадлежность к фракции, информация доступна в канале <#1125432319059185845>`
                ),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Район 4-Хикари")
                                .setValue("4-hikari"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Золотой город Син")
                                .setValue("goldCitySin"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Портовый Тансю")
                                .setValue("tansu"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Окраины Кен-Гетто")
                                .setValue("ken-getto")
                        )
                        .setCustomId("verifyStep3Fracture")
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });

        const selectMenuFracture =
            interaction.channel.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                time: 300000,
                filter: (i) =>
                    i.member.id === interaction.member.id &&
                    i.channelId === interaction.channelId &&
                    i.customId === "verifyStep3Fracture",
            });

        selectMenuFracture.on("collect", async (i) => {
            selectMenuFracture.stop("collected");
            if (
                !interaction.member.roles.cache.has("1125108934915653703") &&
                !interaction.member.roles.cache.has("1125109766222524537") &&
                !interaction.member.roles.cache.has("1125109853136896090") &&
                !interaction.member.roles.cache.has("1125110023144624178")
            )
                switch (i.values[0]) {
                    case "4-hikari":
                        await interaction.member.roles.add(
                            "1125108934915653703"
                        );
                        break;
                    case "goldCitySin":
                        await interaction.member.roles.add(
                            "1125109766222524537"
                        );
                        break;
                    case "tansu":
                        await interaction.member.roles.add(
                            "1125109853136896090"
                        );
                        break;
                    case "ken-getto":
                        await interaction.member.roles.add(
                            "1125110023144624178"
                        );
                        break;
                }
            await i.update({
                embeds: [
                    new ExtendedEmbed()
                        .setTimestamp(null)
                        .setDescription(
                            `- Доступ разрешен. Начислено 240 минут. По истечению данного времени вы будете стерты "Системой". 
- $#%#%%$#&$
- Для поддержания вашей жизни учавствуйте в работах на благо "Системы"

Тяжелые ворота с грохотом распахиваются...`
                        )
                        .setImage(
                            "https://media.discordapp.net/attachments/786930042265272330/1125468406691405874/Kandinsky_2.1_1.jpg?width=1352&height=676"
                        ),
                ],
                components: [],
            });
            await interaction.member.roles.add("1125080526391349348");
            await interaction.member.roles.remove("1125856938379452577");
        });
    },
});
