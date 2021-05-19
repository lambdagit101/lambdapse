const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'circle',
	description: 'Creates a circular image.',
	usage: '[@user (returns your avatar if nonexistant)]',
	async execute(client, message, args) {
			const user = message.mentions.users.first() || message.author;
			const avatar = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true });
			const image = await canvacord.Canvas.circle(avatar);
			const attachment = new Discord.MessageAttachment(image, 'circle.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'circle.png' })
				.setImage(`attachment://circle.png`)
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
