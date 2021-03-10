module.exports = {
	name: 'loop',
  guildOnly: true,
	description: 'Allows you to change the loop mode of the queue.',
  usage: '[on/off]',
	guildOnly: true,
	async execute(client, message, args) {
        	if (args[0].toLowerCase() == "on") {
            		client.player.setLoopMode(message, true);
            		message.channel.send(require('../../messages.json').music_loopon);
        	} else if (args[0].toLowerCase() == "off") {
            		client.player.setLoopMode(message, false);
            		message.channel.send(require('../../messages.json').music_loopoff);
        	};
	},
};
