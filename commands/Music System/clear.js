module.exports = {
	name: 'clear',
	aliases: ['clearqueue'],
	description: 'Clears the queue.',
	guildOnly: true,
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		client.player.clearQueue(message);
		message.channel.send(require('../../messages.json').music_queueclear);
	},
};
