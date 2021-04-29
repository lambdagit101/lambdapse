module.exports = {
        name: 'amogus',
        guildOnly: true,
 	      aliases: ['betrayal'],
        description: 'Sus.',
        emoji: ':no_entry:',
        async execute(client, message, args) {
          if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
        	client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
    			     return message.channel.send(`${invite.code}`);
		      });
        },
};
