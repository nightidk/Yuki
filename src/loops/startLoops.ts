import { mutes } from "./mutes";
import { serverBanner } from "./serverBanner";
import { voiceStats } from "./voiceStats";

export function runLoops() {
    voiceStats();
    serverBanner();
    mutes();
}
