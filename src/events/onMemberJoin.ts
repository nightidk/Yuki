import { Events } from "discord.js";
import { Event } from "../structures/Event";
import LocalBan from "../schemas/LocalBan";

export default new Event(Events.GuildMemberAdd, async (member) => {
    const localbanDB = await LocalBan.findOne({ userId: member.id });
    if (localbanDB) await member.roles.add("1125179117415968878");
    else await member.roles.add("1125856938379452577");
    console.log(member.toJSON());
});
