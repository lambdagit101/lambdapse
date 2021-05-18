module.exports = {
	name: 'pause',
	description: 'Pauses the current song (if playing).',
	guildOnly: true,
	emoji: ':play_pause:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.pause(message);
	},
};
