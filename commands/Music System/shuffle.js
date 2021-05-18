module.exports = {
	name: 'shuffle',
	aliases: ['shufflequeue'],
	description: 'Shuffles the queue',
	guildOnly: true,
	emoji: ':transgender_flag:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.shuffle(message);
		message.channel.send(require('../../messages.json').music_shuffle);
	},
};
