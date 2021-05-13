const Discord = require('discord.js');
const os = require('os');

module.exports = {
	name: 'system',
	aliases: ['specs'],
	description: 'Specifies the server\'s hardware.',
	emoji: ':bread:',
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed()
			.setColor(require('../../messages.json').embed_color)
			.setTimestamp()
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setTitle(require('../../messages.json').bot_sysinfo)
			.setDescription(`**\`${os.userInfo().username}@${os.hostname()}\`**\n**${require('../../messages.json').bot_sysinfoplatform}: \`${os.platform()}\`**\n**${require('../../messages.json').bot_sysinfoarch}: \`${os.arch()}\`**\n**${require('../../messages.json').bot_sysinforam}: \`${os.freemem() / 1024 / 1024} MB/${os.totalmem() / 1024 / 1024} MB\`**`)
		message.channel.send(embed);
	},
};
