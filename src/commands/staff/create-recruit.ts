import {
    ApplicationCommandOptionData,
    SlashCommandStringOption,
} from "discord.js";
import { Command } from "../../structures/Command";
import { userPermissions } from "../../typings/userPermissions";
import { ExtendedEmbed } from "../../structures/Embed";

export default new Command({
    name: "create-recruit",
    description: "Создание нового набора",
    userPermissions: userPermissions.DEVELOPER,
    options: [
        new SlashCommandStringOption()
            .setName("type")
            .setRequired(true)
            .addChoices(
                { name: "Ивентёры", value: "eventers" },
                { name: "Модераторы", value: "moderators" },
                { name: "Саппорты", value: "supports" },
                { name: "Клозеры", value: "closers" }
            ) as ApplicationCommandOptionData,
    ],
    run: async ({ interaction, args }) => {
        const typeOfRecruit = args.getString("type", true);

        const embedToRecruit = new ExtendedEmbed(false);

        switch (typeOfRecruit) {
            case "eventers":
                embedToRecruit.setDescription("");
                embedToRecruit.setAuthor({ name: "" });
                embedToRecruit.setImage("");
                break;
        }
    },
});
