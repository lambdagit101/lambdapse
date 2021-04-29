module.exports = {
        name: 'amogus',
        guildOnly: true,
 	aliases: ['betrayal'],
        description: 'Sus.',
        async execute(client, message, args) {
        	client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
    			return message.channel.send(`${invite.code}`);
		});
        },
};
