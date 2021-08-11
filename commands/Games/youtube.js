const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
	name: 'youtube',
	aliases: ['ytt', 'together'],
	description: 'allows you to watch youtube with friends.\nnot that you have any.',
	guildOnly: true,
	emoji: ':arrow_forward:',
	async execute(client, message, args) {
		if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
		if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
		client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
		const embed = new Discord.MessageEmbed()
          .setTitle('Youtube Together')
		  .setColor('#2013d8')
          .setFooter('dahon bot')
          .setDescription('**Click the button below to start**');
		const button = new MessageButton()
			.setStyle('url')
			.setURL(`${invite.code}`)   
			.setLabel('YT Together');
      return message.channel.send({embed: embed, button: button});
		});
	},
};
