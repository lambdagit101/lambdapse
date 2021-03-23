const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'triggered',
  guildOnly: false,
  aliases: ['trigger'],
	description: 'TRIGGERED.',
  usage: '[@user (returns your avatar if nonexistant)]',
	async execute(client, message, args) {
      var user = message.mentions.users.first() || message.author;
	    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });
	    let image = await canvacord.Canvas.trigger(avatar);
	    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: "triggered.gif" })
				.setImage(`attachment://triggered.gif`)
        .setColor(require('../../messages.json').embed_color)
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
			message.channel.send(embed);
	},
};