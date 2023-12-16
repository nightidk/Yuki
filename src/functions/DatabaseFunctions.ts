import { VoiceBasedChannel, VoiceChannel } from "discord.js";
import { client } from "..";
import User from "../schemas/User";
import Story from "../schemas/Story";
import PRoom from "../schemas/PRoom";
import Mute from "../schemas/Mute";

export async function getUser(userId: string) {
    let model = client.db.modelsDB.get("User") as typeof User;
    if (!(await model.exists({ userId: userId })))
        await model.create({ userId: userId });
    const userDB = await model.findOne({ userId: userId });
    return userDB;
}

export async function setMarry(userId1: string, userId2: string) {
    let model = client.db.modelsDB.get("User") as typeof User;
    let marryDate = new Date();
    await model.updateOne(
        { userId: userId1 },
        {
            $set: {
                "marry.married": true,
                "marry.partner": userId2,
                "marry.marryDate": marryDate,
            },
        }
    );
    await model.updateOne(
        { userId: userId2 },
        {
            $set: {
                "marry.married": true,
                "marry.partner": userId2,
                "marry.marryDate": marryDate,
            },
        }
    );
}

export async function updateChatStats(userId: string, chatId: string) {
    let userDB = await getUser(userId);
    if (!userDB) return;
    if (!chatId) return;
    userDB.stats.chatActive.all++;
    if (
        userDB.stats.chatActive.d7.channels.some(
            (channel) => channel.channelId === chatId
        )
    )
        userDB.stats.chatActive.d7.channels.map((channel) => {
            if (channel.channelId === chatId) channel.count++;
        });
    else
        userDB.stats.chatActive.d7.channels.push({
            channelId: chatId,
            count: 1,
        });
    if (
        userDB.stats.chatActive.d14.channels.some(
            (channel) => channel.channelId === chatId
        )
    )
        userDB.stats.chatActive.d14.channels.map((channel) => {
            if (channel.channelId === chatId) channel.count++;
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

export async function updateVoiceStats(userId: string, voiceId: string) {
    let userDB = await getUser(userId);
    if (!userDB) return;
    if (!voiceId) return;
    userDB.stats.voiceActive.all += 60;
    if (
        userDB.stats.voiceActive.d7.channels.some(
            (channel) => channel.channelId === voiceId
        )
    )
        userDB.stats.voiceActive.d7.channels.map((channel) => {
            if (channel.channelId === voiceId) channel.count++;
        });
    else
        userDB.stats.voiceActive.d7.channels.push({
            channelId: voiceId,
            count: 1,
        });
    if (
        userDB.stats.voiceActive.d14.channels.some(
            (channel) => channel.channelId === voiceId
        )
    )
        userDB.stats.voiceActive.d14.channels.map((channel) => {
            if (channel.channelId === voiceId) channel.count++;
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

export async function getStory(userId: string) {
    let model = client.db.modelsDB.get("Story") as typeof Story;
    if (!(await model.exists({ userId: userId })))
        await model.create({ userId: userId });
    const storyDB = await model.findOne({ userId: userId });
    return storyDB;
}

export async function updateStory(userId: string) {
    let model = client.db.modelsDB.get("Story") as typeof Story;
    await model.updateOne({ userId: userId }, { $inc: { storyPage: 1 } });
}

export async function updateChapter(userId: string, chapter: string) {
    let model = client.db.modelsDB.get("Story") as typeof Story;
    await model.updateOne({ userId: userId }, { $set: { chapter: chapter } });
}

export async function getRoom(roomId: string) {
    if (!roomId) return null;
    let model = client.db.modelsDB.get("PRoom") as typeof PRoom;
    const room = await model.findOne({ roomId: roomId });
    return room;
}

export async function createRoom(
    roomId: string,
    ownerId: string,
    channel: VoiceChannel
) {
    let model = client.db.modelsDB.get("PRoom") as typeof PRoom;
    await model.create({ roomId: roomId, ownerId: ownerId });
    await channel.permissionOverwrites.create(ownerId, {
        Connect: true,
    });
}

export async function deleteRoom(roomId: string) {
    let model = client.db.modelsDB.get("PRoom") as typeof PRoom;
    await model.deleteOne({ roomId: roomId }).catch(() => {});
}

export async function setRoomOwner(
    roomId: string,
    ownerId: string,
    channel: VoiceChannel
) {
    if (!roomId || !ownerId) return;

    let model = client.db.modelsDB.get("PRoom") as typeof PRoom;
    await model.updateOne({ roomId: roomId }, { $set: { ownerId: ownerId } });
    await channel.permissionOverwrites.create(ownerId, {
        Connect: true,
    });
}

export async function getMuteLTETimestamp(timestamp: number) {
    if (!timestamp) return;

    let model = client.db.modelsDB.get("Mute") as typeof Mute;
    return await model.find({ timestampEnd: { $lte: timestamp } });
}

export async function deleteMute(userId: string) {
    if (!userId) return;

    let model = client.db.modelsDB.get("Mute") as typeof Mute;
    await model.deleteOne({ userId: userId });
}

export async function deleteLB(userId: string) {
    if (!userId) return;

    let model = client.db.modelsDB.get("LocalBan") as typeof Mute;
    await model.deleteOne({ userId: userId });
}
