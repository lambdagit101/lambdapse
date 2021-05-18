module.exports = {
	name: 'skip',
	description: 'Skips the current song.',
	guildOnly: true,
	emoji: ':middle_finger:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.skip(message);
	},
};
