const Discord = require('discord.js');

module.exports = {
	name: 'hug',
  usage: '[@user]',
  guildOnly: true,
	description: 'Hugs someone. Virtually, of course.',
	emoji: ':people_hugging:',
	async execute(client, message, args) {
        	if (message.mentions.users.first() == message.author) return message.channel.send(require('../../messages.json').emote_hug_yourself);
        	if (!message.mentions.users.first()) return message.channel.send(require('../../messages.json').emote_hug_noperson);
					const embed = new Discord.MessageEmbed()
            		.setTitle(`${message.author.username} hugs ${message.mentions.users.first().username}`)
                .setDescription(args.slice(1, args.length).join(' ') || require('../../messages.json').emote_hug)
            		.setImage(gif)
                .setColor(require('../../messages.json').embed_color)
                .setTimestamp()
                .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
					let gif = await fetch('https://nekos.life/api/v2/img/hug').then(response => response.json());
			    embed.setImage(gif.url)
        	message.channel.send(embed);
	},
};
