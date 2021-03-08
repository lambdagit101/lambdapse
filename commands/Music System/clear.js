module.exports = {
	name: 'clear',
    guildOnly: true,
    aliases: ['clearqueue'],
	description: 'Clears the queue.',
	async execute(client, message, args) {
		client.player.clear(message);
        message.channel.send('**:white_check_mark: | Queue has been cleared.**');
	},
}; 
