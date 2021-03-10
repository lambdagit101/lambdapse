module.exports = {
	name: 'resume',
	description: 'Resumes the current song (if paused).',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.resume(message);
	},
};
