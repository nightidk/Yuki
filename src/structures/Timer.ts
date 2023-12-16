import { client } from "..";
import { ExtendedClient } from "./Client";

export function Timer(
    name: string,
    fn: Function,
    delay: number,
    ...args: Array<any>
) {
    let timerId = setTimeout(() => {
        fn(...args).then(() => {
            clearTimeout(timerId);
            client.loops.set(name, Timer(name, fn, delay, ...args));
        });
    }, delay);
    return timerId;
}
