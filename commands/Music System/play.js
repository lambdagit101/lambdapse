module.exports = {
	name: 'play',
	usage: '[search query]',
	aliases: ['add', 'push', 'p'],
	description: 'Adds a song in the queue.',
	emoji: ':play_pause:',
	guildOnly: true,
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.play(message, args.join(' '));
	},
};
