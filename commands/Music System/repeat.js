module.exports = {
	name: 'repeat',
	description: 'Allows you to change the repeat mode of the currently playing song.',
	usage: '[on/off]',
	guildOnly: true,
	emoji: ':repeat_one:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		if (args[0].toLowerCase() == "on") {
			client.player.setRepeatMode(message, true);
			message.channel.send(require('../../messages.json').music_repeaton);
		} else if (args[0].toLowerCase() == "off") {
			client.player.setRepeatMode(message, false);
			message.channel.send(require('../../messages.json').music_repeatoff);
		};
	},
};
