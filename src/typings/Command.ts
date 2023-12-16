import { ExtendedClient } from "../structures/Client";
import {
    APIModalInteractionResponseCallbackData,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    Interaction,
    JSONEncodable,
    ModalComponentData,
} from "discord.js";
import { userPermissions } from "./userPermissions";

export interface ExtendedCommandInteraction extends CommandInteraction {
    member: GuildMember;
}

export type ExtendedInteraction = Interaction & {
    member: GuildMember;
    showModal(
        modal:
            | JSONEncodable<APIModalInteractionResponseCallbackData>
            | ModalComponentData
            | APIModalInteractionResponseCallbackData
    ): Promise<void>;
};

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedCommandInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: userPermissions;
    run: RunFunction;
} & ChatInputApplicationCommandData;
