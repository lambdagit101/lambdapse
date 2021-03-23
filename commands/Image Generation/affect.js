const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'affect',
  guildOnly: false,
  aliases: ['drink'],
	description: 'No, it does not affect my baby.',
  usage: '[@user (returns your avatar if nonexistant)]',
	async execute(client, message, args) {
      var user = message.mentions.users.first() || message.author;
	    let avatar = user.displayAvatarURL({ format: 'png', size: 1024 });
	    let image = await canvacord.Canvas.affect(avatar);
	    let attachment = new Discord.MessageAttachment(image, "affect.png");
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: "affect.png" })
				.setImage(`attachment://affect.png`)
        .setColor(require('../../messages.json').embed_color)
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
			message.channel.send(embed);
	},
};