"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringDate = exports.getTimestamp = exports.convertStringTimeToSeconds = exports.getLevelExp = exports.roundRect = exports.getTimeBalance = exports.declension = exports.getTimeMute = exports.getTime = exports.getAvatar = void 0;
const tslib_1 = require("tslib");
const undici_1 = require("undici");
const canvas_1 = tslib_1.__importDefault(require("canvas"));
async function getAvatar(image) {
    const body1 = (await (0, undici_1.request)(image)).body;
    const avatarMember = new canvas_1.default.Image();
    avatarMember.src = Buffer.from(await body1.arrayBuffer());
    const avatarMemberCropped = new canvas_1.default.Image();
    avatarMemberCropped.src = cropAvatar(avatarMember);
    return avatarMemberCropped;
}
exports.getAvatar = getAvatar;
function getTime(seconds) {
    const h = String(Math.floor(seconds / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    return h ? (m ? `${h}ч. ${m}м.` : `${h}ч.`) : `${m}м.`;
}
exports.getTime = getTime;
function getTimeMute(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d > 0 ? `${d} ${declension(["день", "дня", "дней"], d)}` : ``} ${h > 0 ? `${h} ${declension(["час", "часа", "часов"], h)}` : ``} ${m > 0 ? `${m} ${declension(["минуту", "минуты", "минут"], m)}` : ``} ${s > 0 ? `${s} ${declension(["секунду", "секунды", "секунд"], s)}` : ``}`.trim();
}
exports.getTimeMute = getTimeMute;
function declension(forms, val) {
    const cases = [2, 0, 1, 1, 1, 2];
    if (val % 100 > 4 && val % 100 < 20)
        return forms[2];
    else {
        if (val % 10 < 5)
            return forms[cases[val % 10]];
        else
            return forms[cases[5]];
    }
}
exports.declension = declension;
function getTimeBalance(seconds) {
    const d = String(Math.floor(seconds / (3600 * 24)));
    const h = String(Math.floor((seconds % (3600 * 24)) / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    return `${d.length === 1 ? `0${d}` : d}.${h.length === 1 ? `0${h}` : h}.${m.length === 1 ? `0${m}` : m}`;
}
exports.getTimeBalance = getTimeBalance;
function cropAvatar(Image) {
    const canvas = canvas_1.default.createCanvas(Image.width, Image.height);
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(Image.width / 2, Image.height / 2, Image.width / 2 - 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(Image, 0, 0, Image.width, Image.height);
    return canvas.toBuffer();
}
function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r)
        r = w / 2;
    if (h < 2 * r)
        r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    return ctx;
}
exports.roundRect = roundRect;
function getLevelExp(level) {
    return Number((((level / 10) ** 2 + (level / 10) * 23.9) * 100).toFixed());
}
exports.getLevelExp = getLevelExp;
function convertStringTimeToSeconds(stringTime) {
    const convert_time = {
        с: 1,
        м: 60,
        ч: 3600,
        д: 86400,
        s: 1,
        m: 60,
        h: 3600,
        d: 86400,
    };
    let timemute = 0;
    const regMute = new RegExp("[0-9]+[ДдDdЧчHhМмMmСсSs]", "g");
    const regNumber = new RegExp("[0-9]+", "g");
    let foundtime = [...stringTime.matchAll(regMute)];
    for (let match of foundtime) {
        const matchValue = match[0];
        const textValue = ((matchValue || "s")[(matchValue?.length || 1) - 1] || "c").toLowerCase();
        timemute +=
            parseInt((matchValue?.match(regNumber) || ["1"])[0] || "1") *
                convert_time[textValue];
    }
    return timemute;
}
exports.convertStringTimeToSeconds = convertStringTimeToSeconds;
function getTimestamp() {
    return Number((new Date().getTime() / 1000).toFixed());
}
exports.getTimestamp = getTimestamp;
function getStringDate(date) {
    return `${date.getDate().toString().length == 1
        ? `0${date.getDate()}`
        : date.getDate()}.${(date.getMonth() + 1).toString().length == 1
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1}.${date.getFullYear()}`;
}
exports.getStringDate = getStringDate;
