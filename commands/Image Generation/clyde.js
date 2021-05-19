const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'clyde',
	description: 'Clyde.',
	usage: '[text]',
	async execute(client, message, args) {
			const image = await canvacord.Canvas.clyde(args.join(' ') || 'Your message could not be delivered because you don\'t share a server with the recipient or you disabled direct messages on your shared server, recipient is only accepting direct messages from friends, or you were blocked by the recipient.');
			const attachment = new Discord.MessageAttachment(image, 'clyde.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'clyde.png' })
				.setImage('attachment://clyde.png')
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
