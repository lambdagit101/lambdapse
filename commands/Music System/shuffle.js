module.exports = {
	name: 'shuffle',
  guildOnly: true,
  aliases: ['shufflequeue'],
	description: 'Shuffles the queue',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.shuffle(message);
    message.channel.send(require('../../messages.json').music_shuffle);
	},
};
