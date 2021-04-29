module.exports = {
	name: 'shuffle',
  aliases: ['shufflequeue'],
	description: 'Shuffles the queue',
	guildOnly: true,
	emoji: ':transgender_flag:',
	async execute(client, message, args) {
		client.player.shuffle(message);
    message.channel.send(require('../../messages.json').music_shuffle);
	},
};
