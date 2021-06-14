const Discord = require('discord.js');
const { Levels, enabled } = require('../../modules/leveling.js');

module.exports = {
	name: 'setlevel',
	description: 'Allows server administrators to change a user\'s level.',
	permissions: 'ADMINISTRATOR',
	emoji: ':gem:',
	usage: '[@user] [level]',
	guildOnly: true,
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);
		if (!message.mentions.members.first()) return message.channel.send('cock');
		Levels.setLevel(message.mentions.members.first().id, message.guild.id, args[1]);
	},
};
