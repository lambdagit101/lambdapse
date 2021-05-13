module.exports = {
	name: 'youtube',
	aliases: ['dailymotion', 'vimeo', 'oniontube', 'cock'],
	description: 'allows you to watch youtube with friends.\nnot that you have any.',
	guildOnly: true,
	emoji: ':arrow_forward:',
	async execute(client, message, args) {
		if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
		client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
			return message.channel.send(`<${invite.code}>`);
		});
	},
};
