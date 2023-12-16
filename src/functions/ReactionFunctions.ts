import { TextChannel } from "discord.js";
import { client } from "./../index";
export async function getRandomImage(commandName: string) {
    const guild = client.guilds.cache.get("994320038922301532");

    const channel = guild.channels.cache.find(
        (c) => c.name == commandName
    ) as TextChannel;

    let messages = (await channel.messages.fetch()).map((m) => m);

    messages = messages.filter(
        (m) => m.attachments.size > 0 && m.attachments.size == 1
    );

    return messages[Math.floor(Math.random() * messages.length)].attachments.at(
        0
    ).url;
}
