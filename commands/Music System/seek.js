module.exports = {
	name: 'seek',
	description: 'Seeks through the current song.',
	usage: '[time of the video in seconds]',
	guildOnly: true,
	emoji: ':see_no_evil:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.seek(message, args[0]);
	},
};
