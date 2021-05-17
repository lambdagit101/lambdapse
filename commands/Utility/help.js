// Couldn't prevent myself
const paginationEmbed = require('discord.js-pagination-fork');
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: `Did you just do **\`${require('../../messages.json').bot_prefix}help\`** on help?`,
	usage: '[command name (optional)]',
	emoji: ':bread:',
	async execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			paginationEmbed(message, client.helpPages);
			return;
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send('This command does not exist');
		}

		data.push(`**${command.emoji || ':package:'} ${command.name}**`);
		if (command.aliases) data.push(`**${require('../../messages.json').bot_aliases}:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**${require('../../messages.json').bot_description}:** ${command.description}`);
		if (command.usage) data.push(`**${require('../../messages.json').bot_usage}:** **\`${require('../../messages.json').bot_prefix}${command.name} ${command.usage}\`**`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		const comembed = new Discord.MessageEmbed()
			.setColor(require('../../messages.json').embed_color)
			.setTimestamp()
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setDescription(data.join('\n'))
		return message.channel.send(comembed);
	},
};
