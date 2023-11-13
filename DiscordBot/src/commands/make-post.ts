import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder } from 'discord.js';
import { ISlashCommand } from '../utils/types';
import { Image, Quote, connection } from '../sequelize';
import { storageUrl } from '../config.json';

export const MakePost: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('make-post')
        .setDescription('Post an image with a quote.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const randomImage = await Image.findOne({ where: { posted: false }, order: connection.random() });
        const randomQuote = await Quote.findOne({ where: { posted: false }, order: connection.random() });

        if (!randomImage || !randomQuote) {
            await interaction.reply("Could not find any quote or image to post. Bowomp :(");
            return;
        }

        const embed = new EmbedBuilder()
            .setDescription(randomQuote.getDataValue("quote"))
            .setImage(storageUrl + randomImage.getDataValue("name"));

        await interaction.reply({ embeds: [embed] });

        await randomImage.update({ posted: true });
        await randomQuote.update({ posted: true });
    }
}