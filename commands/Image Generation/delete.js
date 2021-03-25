const canvacord = require('canvacord');
const Discord = require('discord.js');

module.exports = {
	name: 'delete',
  guildOnly: false,
	description: 'Delete.',
  usage: '[@user (returns your avatar if nonexistant)]',
	async execute(client, message, args) {
      var user = message.mentions.users.first() || message.author;
	    let avatar = user.displayAvatarURL({ format: 'png', size: 1024 });
	    let image = await canvacord.Canvas.delete(avatar, false);
	    let attachment = new Discord.MessageAttachment(image, "delete.png");
			const embed = new Discord.MessageEmbed()
				.attachFiles({ attachment: image, name: "delete.png" })
				.setImage(`attachment://delete.png`)
        .setColor(require('../../messages.json').embed_color)
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
			message.channel.send(embed);
	},
};
