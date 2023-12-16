import { client } from "./../index";
import { Event } from "../structures/Event";

export default new Event("ready", () => {
    console.log(`${client.user.tag} is now online`);
});
