const emotes = require("discord-emotes");
const Discord = require('discord.js');

module.exports = {
	name: 'kiss',
  usage: '[@user]',
  guildOnly: true,
	description: 'Kisses someone. Virtually, of course.',
	async execute(client, message, args) {
        	if (message.mentions.users.first() == message.author) return message.channel.send(require('../../messages.json').emote_kiss_yourself);
        	if (!message.mentions.users.first()) return message.channel.send(require('../../messages.json').emote_kiss_noperson);
			emotes.kiss().then(gif => {
				const embed = new Discord.MessageEmbed()
            		.setTitle(`${message.author.username} kisses ${message.mentions.users.first().username}`)
                	.setDescription(args.slice(1, args.length).join(' ') || require('../../messages.json').emote_kiss)
            		.setImage(gif)
                	.setColor(require('../../messages.json').embed_color)
                    .setTimestamp()
                    .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        		message.channel.send(embed);
            });
	},
};
