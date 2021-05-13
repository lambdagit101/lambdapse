module.exports = {
	name: 'seek',
	description: 'Seeks through the current song.',
  usage: '[time of the video in seconds]',
	guildOnly: true,
	emoji: ':see_no_evil:',
	async execute(client, message, args) {
		client.player.seek(message, args[0]);
	},
};
