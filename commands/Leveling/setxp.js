const Discord = require('discord.js');
const { Levels, enabled } = require('../../modules/leveling.js');

module.exports = {
	name: 'setxp',
	description: 'Allows server administrators to change a user\'s XP.',
	permissions: 'ADMINISTRATOR',
	emoji: ':gem:',
	usage: '[@user] [xp]',
	guildOnly: true,
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);
		if (!message.mentions.members.first()) return message.channel.send('cock');
		Levels.setXp(message.mentions.members.first().id, message.guild.id, args[1]);
	},
};
