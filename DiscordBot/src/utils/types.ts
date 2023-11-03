import { Client, Collection, ClientOptions, SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';

/**
 * Extension of DiscordJS client to add a commands attribute
 */
export class IClient extends Client {
    public commands: Collection<string, ISlashCommand>

    constructor(options: ClientOptions, commands: Collection<string, ISlashCommand>) {
        super(options);
        this.commands = commands;
    }
}

/**
 * Object to represent a "SlashCommand" in the common structure of the application
 * data - the actual slash command builder
 * execute - what happens when the command is ran
 */
export type ISlashCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
}