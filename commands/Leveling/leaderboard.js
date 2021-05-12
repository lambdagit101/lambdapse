const Discord = require('discord.js');
const { Levels, enabled } = require('../../modules/leveling.js');

module.exports = {
	name: 'leaderboard',
	aliases: ["level"],
	description: `Shows all the people in the server.`,
	emoji: ':gem:',
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);

		const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

		if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

		const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

		const lb = leaderboard.map(e => `**${e.position}.** \`${e.username}#${e.discriminator}\` - **Level:** **${e.level}** - **XP: ${e.xp.toLocaleString()}**`);

		const embed = new Discord.MessageEmbed()
			.setTitle("Leaderboard")
			.setColor(require('../../messages.json').embed_color)
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setTimestamp()
			.setDescription(lb.join('\n'))
		message.channel.send(embed);
	},
};
