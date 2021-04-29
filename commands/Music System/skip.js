module.exports = {
	name: 'skip',
	description: 'Skips the current song.',
	guildOnly: true,
	emoji: ':middle_finger:',
	async execute(client, message, args) {
		client.player.skip(message);
	},
};
