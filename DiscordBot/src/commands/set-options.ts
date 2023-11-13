import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ChannelType, TextChannel, EmbedBuilder } from 'discord.js';
import { IClient, ISlashCommand } from '../utils/types';
import { connection, Image, Quote } from '../sequelize';
import { storageUrl } from '../config.json';

export let prevInterval: number;
let channel: TextChannel;
let timer: number;

export const SetOptions: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('set-options')
        .setDescription('Set the post frequency and channel to post to. Will not automatically post unless command is run')
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('The time to delay between posts (in seconds). MAXIMUM: 1440 mins, MINIMUM: 5 mins')
                .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to shitpost to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let potential_value: number|null = interaction.options.getInteger('time');
        let potential_channel: TextChannel|null = interaction.options.getChannel('channel');

        if (!potential_channel) {
            await interaction.reply("Channel is not valid");
            return;
        }
        
        if (!potential_value || potential_value > 1440 || potential_value < 1) {
            await interaction.reply("Value is not valid, max: 1440, min: 5");
            return;
        }

        timer = (potential_value * 60 * 1000);
        channel = potential_channel;
        await interaction.reply("Set post timer to: " + timer + "ms (" + (timer / 1000 / 60) + " min(s))\nWill also now post to #" + channel.name);

        if (prevInterval) {
            try {
                clearInterval(prevInterval);
            } catch (error) {
                console.error("Unable to clear previous interval");
            }
        }

        prevInterval = setInterval(MakePostInterval, timer, interaction.client);
    }
}

async function MakePostInterval(bot: IClient) {
    // Hard coded because I hate this shit and can't pull the function from set-timer in here
    // I'm not a JS dev, don't ask
    const post_channel = await bot.channels.fetch(channel.id)

    if (!post_channel) {
        console.log("Could not find channel to send message to");
        return;
    }

    const randomImage = await Image.findOne({ where: { posted: false }, order: connection.random() });
    const randomQuote = await Quote.findOne({ where: { posted: false }, order: connection.random() });

    if (!randomImage || !randomQuote) {
        console.log("Nothing to post, skipping iteration");
        return;
    }

    const embed = new EmbedBuilder()
        .setDescription(randomQuote.getDataValue("quote"))
        .setImage(storageUrl + randomImage.getDataValue("name"));

    await channel.send({ embeds: [embed] });
    await randomImage.update({ posted: true });
    await randomQuote.update({ posted: true });
}