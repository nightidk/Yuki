"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const __1 = require("..");
function Timer(name, fn, delay, ...args) {
    let timerId = setTimeout(() => {
        fn(...args).then(() => {
            clearTimeout(timerId);
            __1.client.loops.set(name, Timer(name, fn, delay, ...args));
        });
    }, delay);
    return timerId;
}
exports.Timer = Timer;
