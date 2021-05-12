const Discord = require('discord.js');

module.exports = {
	name: 'slap',
  usage: '[@user]',
  guildOnly: true,
	description: 'Slaps someone. Virtually, of course.',
	emoji: ':skull:',
	async execute(client, message, args) {
        	if (message.mentions.users.first() == message.author) return message.channel.send(require('../../messages.json').emote_slap_yourself);
        	if (!message.mentions.users.first()) return message.channel.send(require('../../messages.json').emote_slap_noperson);
					const embed = new Discord.MessageEmbed()
            		.setTitle(`${message.author.username} slaps ${message.mentions.users.first().username}`)
                .setDescription(args.slice(1, args.length).join(' ') || require('../../messages.json').emote_slap)
            		.setImage(gif)
                .setColor(require('../../messages.json').embed_color)
                .setTimestamp()
                .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
					gif = await fetch('https://nekos.life/api/v2/img/slap').then(response => response.json());
					embed.setImage(gif.url)
					message.channel.send(embed);
	},
};
