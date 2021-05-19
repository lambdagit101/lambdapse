const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'changemymind',
	description: 'Change my mind.',
	usage: '[text]',
	async execute(client, message, args) {
			const image = await canvacord.Canvas.changemymind(args.join(' ') || 'Life is pain');
			const attachment = new Discord.MessageAttachment(image, 'changemymind.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'changemymind.png' })
				.setImage('attachment://changemymind.png')
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
