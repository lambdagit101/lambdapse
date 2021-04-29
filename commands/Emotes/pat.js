const emotes = require("discord-emotes");
const Discord = require('discord.js');

module.exports = {
	name: 'pat',
  usage: '[@user]',
  guildOnly: true,
	description: 'Pats someone. Virtually, of course.',
	emoji: ':hatching_chick:',
	async execute(client, message, args) {
        	if (message.mentions.users.first() == message.author) return message.channel.send(require('../../messages.json').emote_pat_yourself);
        	if (!message.mentions.users.first()) return message.channel.send(require('../../messages.json').emote_pat_noperson);
					emotes.pat().then(gif => {
						const embed = new Discord.MessageEmbed()
            		.setTitle(`${message.author.username} pats ${message.mentions.users.first().username}`)
                .setDescription(args.slice(1, args.length).join(' ') || require('../../messages.json').emote_pat)
            		.setImage(gif)
                .setColor(require('../../messages.json').embed_color)
                .setTimestamp()
                .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        		message.channel.send(embed);
          });
	},
};
