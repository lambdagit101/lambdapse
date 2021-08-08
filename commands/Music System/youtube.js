const Discord = require('discord.js');

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
        			.setColor('#db1313')
       	 			//.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        			//.setTimestamp()
        			.setDescription('**Click the button below to start**')
      			let button = new MessageButton()
        			.setStyle('url')
        			.setURL(${invite.code}) 
        			.setLabel('YT Together'); 
      		return message.channel.send(embed, button);
		});
	},
};
