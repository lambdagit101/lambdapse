module.exports = {
	name: 'seek',
  guildOnly: true,
	description: 'Seeks through the current song.',
  usage: '[time of the video in seconds]',
	guildOnly: true,
	async execute(client, message, args) {
		client.player.seek(message, args[0]);
	},
};
