const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  guildOnly: false,
  aliases: ['pfp'],
  description: 'Sends a profile picture.',
  usage: '[@user (returns your avatar if nonexistant)]',
  avatar: ':baby:',
  async execute(client, message, args) {
		const user = message.mentions.users.first() || message.author;
		const embed = new Discord.MessageEmbed()
		  .setColor(require('../../messages.json').embed_color)
		  .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
		  .setTimestamp()
		  .setImage(user.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
		message.channel.send(embed);
  },
};
