import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { Button } from "../structures/Button";
import { userPermissions } from "../typings/userPermissions";
import { ExtendedEmbed } from "../structures/Embed";

const customId = "dev_panel";

export default new Button({
    userPermissions: userPermissions.DEVELOPER,
    getCustomId: () => {
        return customId;
    },
    build: () => {
        let button = new ButtonBuilder();
        button.setCustomId(customId);

        button.setStyle(ButtonStyle.Secondary);
        button.setLabel("Панель разработчика");

        return button;
    },
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
        await interaction.update({
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
    const h = String(Math.floor(seconds / 3600000));
    const m = String(Math.floor((seconds % 3600000) / 60));
    const s = String(Math.floor((seconds % 3600000) % 60));
    return `${h.length === 1 ? "0" + h : h}:${m.length === 1 ? "0" + m : m}:${
        s.length === 1 ? "0" + s : s
    }`;
}
