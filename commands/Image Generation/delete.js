const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'delete',
	alias: ['trash'],
	description: 'Delete.',
	usage: '[@user (returns your avatar if nonexistant)]',
	emoji: ':wastebasket:',
	async execute(client, message, args) {
			const user = message.mentions.users.first() || message.author;
			const avatar = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true });
			const image = await canvacord.Canvas.delete(avatar, false);
			const attachment = new Discord.MessageAttachment(image, 'delete.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'delete.png' })
				.setImage('attachment://delete.png')
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
