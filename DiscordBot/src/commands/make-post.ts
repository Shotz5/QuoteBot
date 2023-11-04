import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { ISlashCommand } from '../utils/types';
import { Image, Quote } from '../sequelize';
import { storageUrl, dev } from '../config.json';

export const MakePost: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('make-post')
        .setDescription('Post an image with a quote.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const randomImage = Image.build({
            name: "zGUrDAtaW8zULPcE5A7pwmSlppCGHsT02HTtw7MO.png",
            posted: false,
        });

        const randomQuote = Quote.build({
            quote: "This is a cool test quote",
            posted: false,
        });

        if (!randomImage || !randomQuote) {
            await interaction.reply("Could not find any quote or image to post");
            return;
        }

        if (dev) {
            const file = new AttachmentBuilder(storageUrl + randomImage.getDataValue("name"));
            const embed = new EmbedBuilder()
                .setDescription(randomQuote.getDataValue("quote"))
                .setImage("attachment://" + randomImage.getDataValue("name"));

            await interaction.reply({ embeds: [embed], files: [file] });
        } else {
            const embed = new EmbedBuilder()
                .setDescription(randomQuote.getDataValue("quote"))
                .setImage(storageUrl + randomImage.getDataValue("name"));

            await interaction.reply({ embeds: [embed] });
        }
    }
}
