"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Button_1 = require("../structures/Button");
const userPermissions_1 = require("../typings/userPermissions");
const Embed_1 = require("../structures/Embed");
const customId = "dev_panel";
exports.default = new Button_1.Button({
    userPermissions: userPermissions_1.userPermissions.DEVELOPER,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new discord_js_1.ButtonBuilder();
        button.setCustomId(customId);
        button.setStyle(discord_js_1.ButtonStyle.Secondary);
        button.setLabel("Панель разработчика");
        return button;
    },
    run: async ({ client, interaction }) => {
        const serverUsages = (await client.hostClient.getServerUsages("7fb32e5e"));
        await interaction.update({
            embeds: [
                new Embed_1.ExtendedEmbed()
                    .setAuthor({ name: "Панель разработчика" })
                    .addFields([
                    {
                        name: "RAM",
                        value: `\`\`\`${(serverUsages.resources.memory_bytes *
                            10 ** -6).toFixed()}mb\`\`\``,
                        inline: true,
                    },
                    {
                        name: "CPU",
                        value: `\`\`\`${serverUsages.resources.cpu_absolute.toFixed()}%\`\`\``,
                        inline: true,
                    },
                    {
                        name: "Uptime",
                        value: `\`\`\`${getTime(serverUsages.resources.uptime)}\`\`\``,
                        inline: true,
                    },
                ]),
            ],
            components: [
                new discord_js_1.ActionRowBuilder().addComponents(client.buttons.get("dev_restart").build()),
            ],
        });
    },
});
function getTime(miliseconds) {
    const seconds = Number((miliseconds / 1000).toFixed());
    const h = String(Math.floor(seconds / 3600000));
    const m = String(Math.floor((seconds % 3600000) / 60));
    const s = String(Math.floor((seconds % 3600000) % 60));
    return `${h.length === 1 ? "0" + h : h}:${m.length === 1 ? "0" + m : m}:${s.length === 1 ? "0" + s : s}`;
}
