import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ChannelType, TextChannel, EmbedBuilder } from 'discord.js';
import { ISlashCommand } from '../utils/types';
import { prevInterval } from './set-options';

export const StopTimer: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('stop-timer')
        .setDescription('Stop posting on a timer'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        try {
            clearInterval(prevInterval);
        } catch (error) {
            await interaction.reply("An error occured while trying to clear the interval, it may not be running");
            return;
        }
        await interaction.reply("Stopped the interval, no more posts for now! :)");
    }
}