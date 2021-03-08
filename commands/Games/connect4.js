const GameCord = require("gamecord-fork").djs;
const Discord = require('discord.js');

module.exports = {
	name: 'connect4',
    guildOnly: true,
    aliases: ['c4', 'connectfour'],
	description: 'Starts a Connect 4 game.',
	async execute(client, message, args) {
        new GameCord.ConnectFour(message)
            .setTitle('Connect 4')
            .setColor(require('../../messages.json').embed_color)
            .run()
	},
}; 
