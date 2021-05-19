const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'hitler',
	description: 'Worse than Hitler.',
	usage: '[@user (returns your avatar if nonexistant)]',
	emoji: ':flag_de:',
	async execute(client, message, args) {
			const user = message.mentions.users.first() || message.author;
			const avatar = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true });
			const image = await canvacord.Canvas.hitler(avatar);
			const attachment = new Discord.MessageAttachment(image, 'hitler.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'hitler.png' })
				.setImage('attachment://hitler.png')
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
