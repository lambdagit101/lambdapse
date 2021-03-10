const GameCord = require("gamecord-fork").djs;

module.exports = {
	name: 'snek',
  aliases: ['snake'],
	description: 'Starts a game of snek.',
	async execute(client, message, args) {
        new GameCord.SnakeGame(message)
            .setTitle('snek')
            .setColor(require('../../messages.json').embed_color)
            .setTime(60000)
            .run()
	},
};
