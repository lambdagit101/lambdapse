module.exports = {
	name: 'pause',
	description: 'Pauses the current song (if playing).',
	guildOnly: true,
	emoji: ':play_pause:',
	async execute(client, message, args) {
		client.player.pause(message);
	},
};
