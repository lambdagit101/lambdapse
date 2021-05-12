module.exports = {
	name: 'youtube',
	aliases: ['dailymotion', 'vimeo', 'oniontube', 'cock'],
	description: 'allows you to watch youtube with friends.\nnot that you have any.',
	guildOnly: true,
	emoji: ':arrow_forward:',
	async execute(client, message, args) {
		if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
		client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
			/**
			 * Put the URL in <> to stop Discord from showing the (useless) preview
			 * -> "Note: you have to click on the BLUE LINK, not the 'Play' button, in order to start the activity"
			 * 	   https://www.npmjs.com/package/discord-together
			 */
			return message.channel.send(`<${invite.code}>`);
		});
	},
};
