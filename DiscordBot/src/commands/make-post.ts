import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { ISlashCommand } from '../utils/types';
import { Image, Quote } from '../sequelize';
import { storageUrl, dev } from '../config.json';

export const MakePost: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('make-post')
        .setDescription('Post an image with a quote.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const randomImage = await Image.findOne({ where: { posted: false } });
        const randomQuote = await Quote.findOne({ where: { posted: false } });

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
