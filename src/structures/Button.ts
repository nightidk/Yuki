import { ButtonType } from "../typings/Button";

export class Button {
    constructor(modalOptions: ButtonType) {
        Object.assign(this, modalOptions);
    }
}
