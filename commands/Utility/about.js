const Discord = require('discord.js');

module.exports = {
	name: 'about',
	aliases: ["credits"],
	description: `Credits, support information, etc.`,
	emoji: ':bread:',
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed()
			.setColor(require('../../messages.json').embed_color)
			.setTimestamp()
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setTitle(require('../../messages.json').credits_title.replace('(NAME)', require('../../messages.json').bot_name))
			.setDescription(`**${require('../../messages.json').credits_madeby.replace('(NAME)', require('../../messages.json').bot_owner_username)}\n${require('../../messages.json').credits_madeby.replace('(NAME)', require('../../messages.json').bot_owner_username)}\n${require('../../messages.json').replace('(THANKS)', require('../../messages.json').credits_thanks.join(", "))}\n${require('../../messages.json').credits_extramessage || ""}`)
		message.channel.send(embed);
	},
};
