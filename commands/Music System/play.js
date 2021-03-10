module.exports = {
	name: 'play',
  usage: '[search query]',
  aliases: ['add', 'push'],
	description: 'Adds a song in the queue.',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.play(message, args.join(' '));
	},
};
