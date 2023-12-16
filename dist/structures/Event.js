"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    event;
    run;
    once;
    constructor(event, run, once) {
        this.event = event;
        this.run = run;
        this.once = once;
    }
}
exports.Event = Event;
