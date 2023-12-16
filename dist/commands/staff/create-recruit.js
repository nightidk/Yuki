"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const userPermissions_1 = require("../../typings/userPermissions");
const Embed_1 = require("../../structures/Embed");
exports.default = new Command_1.Command({
    name: "create-recruit",
    description: "Создание нового набора",
    userPermissions: userPermissions_1.userPermissions.DEVELOPER,
    options: [
        new discord_js_1.SlashCommandStringOption()
            .setName("type")
            .setRequired(true)
            .addChoices({ name: "Ивентёры", value: "eventers" }, { name: "Модераторы", value: "moderators" }, { name: "Саппорты", value: "supports" }, { name: "Клозеры", value: "closers" }),
    ],
    run: async ({ interaction, args }) => {
        const typeOfRecruit = args.getString("type", true);
        const embedToRecruit = new Embed_1.ExtendedEmbed(false);
        switch (typeOfRecruit) {
            case "eventers":
                embedToRecruit.setDescription("");
                embedToRecruit.setAuthor({ name: "" });
                embedToRecruit.setImage("");
                break;
        }
    },
});
