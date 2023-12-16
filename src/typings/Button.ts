import { ExtendedClient } from "./../structures/Client";
import { ButtonBuilder, ButtonInteraction, GuildMember } from "discord.js";
import { userPermissions } from "./userPermissions";

export interface ExtendedButtonInteraction extends ButtonInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedButtonInteraction;
}

type RunFunction = (options: RunOptions) => any;
export type ButtonType = {
    getCustomId(): string;
    build(): ButtonBuilder;
    userPermissions: userPermissions;
    run: RunFunction;
};
