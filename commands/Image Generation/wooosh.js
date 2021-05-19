const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'wooosh',
	description: 'wooosh.',
	aliases: ['whoosh'],
	usage: '[@user (returns your avatar if nonexistant)]',
	emoji: ':wind_blowing_face:',
	async execute(client, message, args) {
			const user = message.mentions.users.first() || message.author;
			const avatar = user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true });
			const image = await canvacord.Canvas.jokeOverHead(avatar);
			const attachment = new Discord.MessageAttachment(image, 'wooosh.png');
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: 'wooosh.png' })
				.setImage('attachment://wooosh.png')
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
			message.channel.send(embed);
	},
};
