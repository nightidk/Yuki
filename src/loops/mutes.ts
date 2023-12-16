import { Timer } from "../structures/Timer";
import { client } from "..";
import { getTimestamp } from "../functions/CommandFunctions";
import {
    deleteMute,
    getMuteLTETimestamp,
} from "../functions/DatabaseFunctions";

async function loop() {
    let timestamp = getTimestamp();
    const users = await getMuteLTETimestamp(timestamp);
    users.forEach(async (doc) => {
        const user = client.guilds.cache
            .get("1125026376425148516")
            .members.cache.get(doc.userId);
        if (user)
            await user.roles.remove("1125191372501176373").catch(() => {});
        await deleteMute(doc.userId);
    });
}

export function mutes() {
    let timer = Timer("mutes", loop, 5000);
    client.loops.set("mutes", timer);
}
