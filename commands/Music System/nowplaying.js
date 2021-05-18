const Discord = require('discord.js');

module.exports = {
	name: 'nowplaying',
	aliases: ['np'],
	description: 'Shows what\'s playing.',
	guildOnly: true,
	emoji: ':notepad_spiral:',
	async execute(client, message, args) {
		if (require('../../modules/music_system.js').enabled == false) return message.channel.send(require('../../messages.json').music_disabled);
		if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(require('../../messages.json').music_notsamevc);
		if (!client.player.getQueue(message)) return message.channel.send(require('../../messages.json').music_queueempty);
		const track = client.player.nowPlaying(message);
		const filters = [];
		Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;
		const embed = new Discord.MessageEmbed()
			.setTitle('Now playing')
			.setColor(require('../../messages.json').embed_color)
			.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
			.setTimestamp()
			.setDescription(`**Track title:** ${track.title}\n**Channel name:** ${track.author}\n**Requested by:** ${track.requestedBy.tag}\n**From playlist:** ${track.fromPlaylist ? 'Yes' : 'No'}\n**Views:** ${track.views}\n**Duration:** ${track.duration}\n**Repeat mode:** ${client.player.getQueue(message).repeatMode ? 'Yes' : 'No'}\n${client.player.createProgressBar(message, { timecodes: true })}`)
			.setThumbnail(track.thumbnail)
		message.channel.send(embed);
	},
};
