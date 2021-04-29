module.exports = {
	name: 'resume',
	description: 'Resumes the current song (if paused).',
	guildOnly: true,
	emoji: ':play_pause:',
	async execute(client, message, args) {
		client.player.resume(message);
	},
};
