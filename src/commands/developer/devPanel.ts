import { ActionRowBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import { ExtendedEmbed } from "../../structures/Embed";
import { userPermissions } from "../../typings/userPermissions";
import * as os from "os";

export default new Command({
    name: "dev-panel",
    description: "developer panel",
    userPermissions: userPermissions.DEVELOPER,
    run: async ({ client, interaction }) => {
        const serverUsages = (await client.hostClient.getServerUsages(
            "7fb32e5e"
        )) as {
            current_state: string;
            is_suspended: boolean;
            resources: {
                memory_bytes: number;
                cpu_absolute: number;
                disk_bytes: number;
                network_rx_bytes: number;
                network_tx_bytes: number;
                uptime: number;
            };
        };
        await interaction.reply({
            embeds: [
                new ExtendedEmbed()
                    .setAuthor({ name: "Панель разработчика" })
                    .addFields([
                        {
                            name: "RAM",
                            value: `\`\`\`${(
                                serverUsages.resources.memory_bytes *
                                10 ** -6
                            ).toFixed()}mb\`\`\``,
                            inline: true,
                        },
                        {
                            name: "CPU",
                            value: `\`\`\`${serverUsages.resources.cpu_absolute.toFixed()}%\`\`\``,
                            inline: true,
                        },
                        {
                            name: "Uptime",
                            value: `\`\`\`${getTime(
                                serverUsages.resources.uptime
                            )}\`\`\``,
                            inline: true,
                        },
                    ]),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    client.buttons.get("dev_restart").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
        });
    },
});

function getTime(miliseconds: number) {
    const seconds = Number((miliseconds / 1000).toFixed());
    const h = String(Math.floor(seconds / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    const s = String(Math.floor((seconds % 3600) % 60));
    return `${h.length === 1 ? "0" + h : h}:${m.length === 1 ? "0" + m : m}:${
        s.length === 1 ? "0" + s : s
    }`;
}
