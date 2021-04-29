module.exports = {
	name: 'youtube',
	aliases: ['dailymotion', 'vimeo', 'oniontube', 'cock'],
	description: 'allows you to watch youtube with friends.\not that you have any.',
	guildOnly: true,
	async execute(client, message, args) {
		client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
    			return message.channel.send(`${invite.code}`);
		});
	},
};
