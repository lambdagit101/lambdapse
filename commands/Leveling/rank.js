const Discord = require('discord.js');
const canvacord = require('canvacord');
const { Levels, enabled } = require('../../modules/leveling.js');

module.exports = {
	name: 'rank',
	aliases: ["level"],
	description: `Shows your level.`,
	emoji: ':gem:',
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);

		const target = message.mentions.users.first() || message.author;

		const user = await Levels.fetch(target.id, message.guild.id);

		if (!user) return message.channel.send(require('../../messages.json').level_noxp);

		const rank = new canvacord.Rank()
		    .setAvatar(target.displayAvatarURL({ size: 1024, format: "png" }))
		    .setCurrentXP(user.xp)
		    .setRequiredXP(user.xpFor(user.level + 1))
				.setLevel(user.level)
				.setRank(user.position)
		    .setStatus(target.presence.status)
		    .setUsername(target.username)
		    .setDiscriminator(target.discriminator);

		rank.build()
		    .then(data => {
		        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
		        message.channel.send(attachment);
		    });
	},
};
