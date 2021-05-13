const Discord = require('discord.js');
const os = require('os');

module.exports = {
	name: 'system',
	aliases: ["specs"],
	description: `Specifies the server's hardware.`,
	emoji: ':bread:',
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed()
			.setColor(require('../../messages.json').embed_color)
			.setTimestamp()
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setTitle("System Information")
			.setDescription(`**\`${os.userInfo().username}@${os.hostname()}\`**\n**Platform: \`${os.platform()}\`**\n**Architecture: \`${os.arch()}\`**\n**RAM: \`${os.freemem()}B/${os.totalmem()}B\`**`)
		message.channel.send(embed);
	},
};
