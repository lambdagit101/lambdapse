module.exports = {
	name: 'resume',
	description: 'Resumes the current song (if paused).',
	guildOnly: true,
	emoji: ':play_pause:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.resume(message);
	},
};
