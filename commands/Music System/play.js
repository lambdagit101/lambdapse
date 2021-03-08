module.exports = {
	name: 'play',
    guildOnly: true,
    usage: '[search query]',
    cooldown: 5,
    aliases: ['add', 'push'],
	description: 'Adds a song in the queue.',
	async execute(client, message, args) {
		client.player.play(message, args.join(' '));
	},
}; 
