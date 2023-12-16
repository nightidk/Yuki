import { Events } from "discord.js";
import { Event } from "../structures/Event";
import { client } from "..";
import { updateChatStats } from "../functions/DatabaseFunctions";

export default new Event(Events.MessageCreate, async (message) => {
    let command = message.content.split(" ").at(0).slice(1).toLowerCase();

    let dotCommand = client.dotCommands.get(command);

    if (!dotCommand) {
        await updateChatStats(message.author.id, message.channelId);
        return;
    }

    if (!message.content.startsWith(".")) return;

    client.dotCommands.get(command).run({
        client: client,
        message: message,
        mentions: message.mentions.members
            .filter((m) => !m.user.bot && m.id != message.author.id)
            .map((m) => m),
    });
});
