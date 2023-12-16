import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";
import { ModalType } from "./../typings/Modal";

export class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions);
    }
}
