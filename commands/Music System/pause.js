module.exports = {
	name: 'pause',
  guildOnly: true,
	description: 'Pauses the current song (if playing).',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.resume(message);
	},
};
