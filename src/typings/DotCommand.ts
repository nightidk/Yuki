import { ExtendedClient } from "../structures/Client";
import {
    APIModalInteractionResponseCallbackData,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    Interaction,
    JSONEncodable,
    Message,
    ModalComponentData,
} from "discord.js";
import { userPermissions } from "./userPermissions";

export interface ExtendedDotCommandMessage extends Message {
    member: GuildMember;
}

export type ExtendedMessage = Message & {
    member: GuildMember;
};

interface RunOptions {
    client: ExtendedClient;
    message: ExtendedDotCommandMessage;
    mentions: GuildMember[];
}

type RunFunction = (options: RunOptions) => any;

export type DotCommandType = {
    name: string;
    aliases: string[];
    userPermissions?: userPermissions;
    run: RunFunction;
};
