import { ExtendedClient } from "./../structures/Client";
import {
    GuildMember,
    ModalSubmitFields,
    ModalSubmitInteraction,
} from "discord.js";
import { userPermissions } from "./userPermissions";
import { ExtendedInteraction } from "./Command";

export interface ExtendedModalInteraction extends ModalSubmitInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedModalInteraction;
    args: ModalSubmitFields;
}

type RunFunction = (options: RunOptions) => any;
export type ModalType = {
    userPermissions: userPermissions;
    getCustomId(): string;
    showModal(interaction: ExtendedInteraction): Promise<void>;
    run: RunFunction;
};
