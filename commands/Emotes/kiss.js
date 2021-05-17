const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'kiss',
	usage: '[@user]',
	guildOnly: true,
	description: 'Kisses someone. Virtually, of course.',
	emoji: ':kiss_woman_man:',
	async execute(client, message, args) {
		if (message.mentions.users.first() == message.author) return message.channel.send(require('../../messages.json').emote_kiss_yourself);
		if (!message.mentions.users.first()) return message.channel.send(require('../../messages.json').emote_kiss_noperson);
		const gif = await fetch('https://nekos.life/api/v2/img/kiss').then(response => response.json());
		const embed = new Discord.MessageEmbed()
			.setTitle(`${message.author.username} kisses ${message.mentions.users.first().username}`)
			.setDescription(args.slice(1, args.length).join(' ') || require('../../messages.json').emote_kiss)
			.setColor(require('../../messages.json').embed_color)
			.setTimestamp()
			.setImage(gif.url)
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
		message.channel.send(embed);
	},
};
