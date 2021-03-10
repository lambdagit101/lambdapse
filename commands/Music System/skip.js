module.exports = {
	name: 'skip',
	description: 'Skips the current song.',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.skip(message);
	},
};
