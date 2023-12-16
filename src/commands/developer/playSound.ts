import { client } from "./../../index";
import { ActionRowBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import { ExtendedEmbed } from "../../structures/Embed";
import { userPermissions } from "../../typings/userPermissions";
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} from "@discordjs/voice";

export default new Command({
    name: "play-sounds",
    description: "test",
    userPermissions: userPermissions.DEFAULT,
    run: async ({ interaction }) => {
        await interaction.reply({
            embeds: [
                new ExtendedEmbed()
                    .setDescription("Выберите действие:")
                    .setAuthor({
                        name: "Голосовое управление",
                    }),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    client.buttons.get("sounds_join").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
                new ActionRowBuilder().addComponents(
                    client.buttons.get("sounds_play1").build(),
                    client.buttons.get("sounds_play2").build(),
                    client.buttons.get("sounds_play3").build(),
                    client.buttons.get("sounds_play4").build(),
                    client.buttons.get("sounds_stream").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
                new ActionRowBuilder().addComponents(
                    client.buttons.get("sounds_stop").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
                new ActionRowBuilder().addComponents(
                    client.buttons.get("sounds_leave").build()
                ) as ActionRowBuilder<MessageActionRowComponentBuilder>,
            ],
            ephemeral: true,
        });
    },
});
