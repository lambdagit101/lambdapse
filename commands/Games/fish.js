module.exports = {
        name: 'fish',
        guildOnly: true,
        aliases: [],
        description: 'fish',
        async execute(client, message, args) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                        return message.channel.send(`${invite.code}`);
                });
        },
};
