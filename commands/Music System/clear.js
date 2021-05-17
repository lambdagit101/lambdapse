module.exports = {
	name: 'clear',
	aliases: ['clearqueue'],
	description: 'Clears the queue.',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.clearQueue(message);
		message.channel.send(require('../../messages.json').music_queueclear);
	},
};
