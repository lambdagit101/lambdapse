const Discord = require('discord.js');
const { Levels, enabled } = require('../../modules/leveling.js');

module.exports = {
	name: 'deluser',
	description: 'Allows server administrators to completely wipe a user\'s level and XP.',
	permissions: 'ADMINISTRATOR',
	emoji: ':gem:',
	usage: '[@user]',
	guildOnly: true,
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);
		if (!message.mentions.members.first()) return message.channel.send('cock');
		Levels.deleteUser(message.mentions.members.first().id, message.guild.id);
	},
};
