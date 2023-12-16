"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const Embed_1 = require("../../structures/Embed");
const userPermissions_1 = require("../../typings/userPermissions");
exports.default = new Command_1.Command({
    name: "dev-panel",
    description: "developer panel",
    userPermissions: userPermissions_1.userPermissions.DEVELOPER,
    run: async ({ client, interaction }) => {
        const serverUsages = (await client.hostClient.getServerUsages("7fb32e5e"));
        await interaction.reply({
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
    const h = String(Math.floor(seconds / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    const s = String(Math.floor((seconds % 3600) % 60));
    return `${h.length === 1 ? "0" + h : h}:${m.length === 1 ? "0" + m : m}:${s.length === 1 ? "0" + s : s}`;
}
