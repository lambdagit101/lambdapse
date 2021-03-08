module.exports = {
	name: 'repeat',
    guildOnly: true,
	description: 'Allows you to change the repeat mode of the currently playing song.',
    usage: '[on/off]',
	async execute(client, message, args) {
        	if (args[0].toLowerCase() == "on") {
            		client.player.setRepeatMode(message, true);
            		message.channel.send(require('../../messages.json').music_repeaton);
        	} else if (args[0].toLowerCase() == "off") {
            		client.player.setRepeatMode(message, false);
            		message.channel.send(require('../../messages.json').music_repeatoff);
        	};
	},
}; 