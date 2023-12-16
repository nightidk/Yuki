"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Embed_1 = require("./../../structures/Embed");
const userPermissions_1 = require("../../typings/userPermissions");
const Command_1 = require("./../../structures/Command");
const os = tslib_1.__importStar(require("os"));
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: "status",
    description: "Статус бота",
    userPermissions: userPermissions_1.userPermissions.DEFAULT,
    options: [
        new discord_js_1.SlashCommandStringOption()
            .setAutocomplete(false)
            .setRequired(true)
            .setName("type")
            .setChoices({ name: "Short", value: "short" }, { name: "Detailed", value: "detailed" })
            .setDescription("Type of status"),
    ],
    run: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        // const serverUsages = (await client.hostClient.getServerUsages(
        //     "6f5a6786"
        // )) as { current: number; limit: number };
        // console.log(serverUsages);
        // const serverRAMUsages = (await client.hostClient.getRAMUsage(
        //     "6f5a6786"
        // )) as { current: number; limit: number };
        // console.log(serverCPUUsages);
        // console.log(serverRAMUsages);
        /*
                        (
                            (os.totalmem() - os.freemem()) /
                            1000 ** 3
                        ).toFixed(1)}/${(os.totalmem() / 1000 ** 3).toFixed(
                            1
                        )
        */
        await interaction.editReply({
            embeds: [
                new Embed_1.ExtendedEmbed().addFields([
                    {
                        name: "RAM",
                        value: `\`\`\`${((os.totalmem() - os.freemem()) /
                            1000 ** 3).toFixed(1)}/${(os.totalmem() /
                            1000 ** 3).toFixed()}GB\`\`\``,
                        inline: true,
                    },
                    {
                        name: "CPU",
                        value: `\`\`\`${cpuLoad().percent}%\`\`\``,
                        inline: true,
                    },
                    {
                        name: "Uptime",
                        value: `\`\`\`${getTime(process.uptime())}\`\`\``,
                        inline: true,
                    },
                ]),
            ],
        });
    },
});
function getTime(seconds) {
    const h = String(Math.floor(seconds / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    const s = String(Math.floor((seconds % 3600) % 60));
    return `${h.length === 1 ? "0" + h : h}:${m.length === 1 ? "0" + m : m}:${s.length === 1 ? "0" + s : s}`;
}
function cpuPercentage() {
    let totalIdle = 0, totalTick = 0;
    let cpus = os.cpus();
    for (let i = 0; i < cpus.length; i++) {
        for (let type in cpus[i].times)
            totalTick += cpus[i].times[type];
        totalIdle += cpus[i].times.idle;
    }
    let idle = totalIdle / cpus.length, total = totalTick / cpus.length;
    return {
        idle,
        total,
    };
}
function cpuLoad() {
    let cpu = cpuPercentage();
    let percent = Number(((1 - cpu.idle / cpu.total) * 100).toFixed());
    return {
        idle: cpu.idle,
        total: cpu.total,
        percent: percent,
    };
}
