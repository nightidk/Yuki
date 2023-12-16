"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLB = exports.deleteMute = exports.getMuteLTETimestamp = exports.setRoomOwner = exports.deleteRoom = exports.createRoom = exports.getRoom = exports.updateChapter = exports.updateStory = exports.getStory = exports.updateVoiceStats = exports.updateChatStats = exports.setMarry = exports.getUser = void 0;
const __1 = require("..");
async function getUser(userId) {
    let model = __1.client.db.modelsDB.get("User");
    if (!(await model.exists({ userId: userId })))
        await model.create({ userId: userId });
    const userDB = await model.findOne({ userId: userId });
    return userDB;
}
exports.getUser = getUser;
async function setMarry(userId1, userId2) {
    let model = __1.client.db.modelsDB.get("User");
    let marryDate = new Date();
    await model.updateOne({ userId: userId1 }, {
        $set: {
            "marry.married": true,
            "marry.partner": userId2,
            "marry.marryDate": marryDate,
        },
    });
    await model.updateOne({ userId: userId2 }, {
        $set: {
            "marry.married": true,
            "marry.partner": userId2,
            "marry.marryDate": marryDate,
        },
    });
}
exports.setMarry = setMarry;
async function updateChatStats(userId, chatId) {
    let userDB = await getUser(userId);
    if (!userDB)
        return;
    if (!chatId)
        return;
    userDB.stats.chatActive.all++;
    if (userDB.stats.chatActive.d7.channels.some((channel) => channel.channelId === chatId))
        userDB.stats.chatActive.d7.channels.map((channel) => {
            if (channel.channelId === chatId)
                channel.count++;
        });
    else
        userDB.stats.chatActive.d7.channels.push({
            channelId: chatId,
            count: 1,
        });
    if (userDB.stats.chatActive.d14.channels.some((channel) => channel.channelId === chatId))
        userDB.stats.chatActive.d14.channels.map((channel) => {
            if (channel.channelId === chatId)
                channel.count++;
        });
    else
        userDB.stats.chatActive.d14.channels.push({
            channelId: chatId,
            count: 1,
        });
    userDB.stats.chatActive.d7.count++;
    userDB.stats.chatActive.d14.count++;
    await userDB.save();
}
exports.updateChatStats = updateChatStats;
async function updateVoiceStats(userId, voiceId) {
    let userDB = await getUser(userId);
    if (!userDB)
        return;
    if (!voiceId)
        return;
    userDB.stats.voiceActive.all += 60;
    if (userDB.stats.voiceActive.d7.channels.some((channel) => channel.channelId === voiceId))
        userDB.stats.voiceActive.d7.channels.map((channel) => {
            if (channel.channelId === voiceId)
                channel.count++;
        });
    else
        userDB.stats.voiceActive.d7.channels.push({
            channelId: voiceId,
            count: 1,
        });
    if (userDB.stats.voiceActive.d14.channels.some((channel) => channel.channelId === voiceId))
        userDB.stats.voiceActive.d14.channels.map((channel) => {
            if (channel.channelId === voiceId)
                channel.count++;
        });
    else
        userDB.stats.voiceActive.d14.channels.push({
            channelId: voiceId,
            count: 1,
        });
    userDB.stats.voiceActive.d7.count += 60;
    userDB.stats.voiceActive.d14.count += 60;
    await userDB.save();
}
exports.updateVoiceStats = updateVoiceStats;
async function getStory(userId) {
    let model = __1.client.db.modelsDB.get("Story");
    if (!(await model.exists({ userId: userId })))
        await model.create({ userId: userId });
    const storyDB = await model.findOne({ userId: userId });
    return storyDB;
}
exports.getStory = getStory;
async function updateStory(userId) {
    let model = __1.client.db.modelsDB.get("Story");
    await model.updateOne({ userId: userId }, { $inc: { storyPage: 1 } });
}
exports.updateStory = updateStory;
async function updateChapter(userId, chapter) {
    let model = __1.client.db.modelsDB.get("Story");
    await model.updateOne({ userId: userId }, { $set: { chapter: chapter } });
}
exports.updateChapter = updateChapter;
async function getRoom(roomId) {
    if (!roomId)
        return null;
    let model = __1.client.db.modelsDB.get("PRoom");
    const room = await model.findOne({ roomId: roomId });
    return room;
}
exports.getRoom = getRoom;
async function createRoom(roomId, ownerId, channel) {
    let model = __1.client.db.modelsDB.get("PRoom");
    await model.create({ roomId: roomId, ownerId: ownerId });
    await channel.permissionOverwrites.create(ownerId, {
        Connect: true,
    });
}
exports.createRoom = createRoom;
async function deleteRoom(roomId) {
    let model = __1.client.db.modelsDB.get("PRoom");
    await model.deleteOne({ roomId: roomId }).catch(() => { });
}
exports.deleteRoom = deleteRoom;
async function setRoomOwner(roomId, ownerId, channel) {
    if (!roomId || !ownerId)
        return;
    let model = __1.client.db.modelsDB.get("PRoom");
    await model.updateOne({ roomId: roomId }, { $set: { ownerId: ownerId } });
    await channel.permissionOverwrites.create(ownerId, {
        Connect: true,
    });
}
exports.setRoomOwner = setRoomOwner;
async function getMuteLTETimestamp(timestamp) {
    if (!timestamp)
        return;
    let model = __1.client.db.modelsDB.get("Mute");
    return await model.find({ timestampEnd: { $lte: timestamp } });
}
exports.getMuteLTETimestamp = getMuteLTETimestamp;
async function deleteMute(userId) {
    if (!userId)
        return;
    let model = __1.client.db.modelsDB.get("Mute");
    await model.deleteOne({ userId: userId });
}
exports.deleteMute = deleteMute;
async function deleteLB(userId) {
    if (!userId)
        return;
    let model = __1.client.db.modelsDB.get("LocalBan");
    await model.deleteOne({ userId: userId });
}
exports.deleteLB = deleteLB;
