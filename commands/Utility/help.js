const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: `Did you just do **\`${require('../../messages.json').bot_prefix}help\`** on help?`,
	usage: '[command name (optional)]',
	emoji: ':bread:',
	async execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('List of commands');
			data.push(commands.map(command => `**${command.emoji || ':package:'}** ` + command.name).join('\n'));
			data.push(`\nYou can send **\`${require('../../messages.json').bot_prefix}help [command name]\`** to get info on a specific command`);
      const listembed = new Discord.MessageEmbed()
          .setTitle('Help')
          .setColor(require('../../messages.json').embed_color)
          .setTimestamp()
          .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
          .setDescription(data.join('\n'))
			return message.channel.send(listembed)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.channel.send('This command does not exist');
		}

		data.push(`**${command.emoji || ':package:'} ${command.name}**`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** **\`${require('../../messages.json').bot_prefix}${command.name} ${command.usage}\`**`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		const comembed = new Discord.MessageEmbed()
              .setColor(require('../../messages.json').embed_color)
              .setTimestamp()
              .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
              .setDescription(data.join('\n'))
			return message.channel.send(comembed)
	},
};
