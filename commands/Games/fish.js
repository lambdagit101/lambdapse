module.exports = {
        name: 'fish',
        guildOnly: true,
        aliases: [],
        description: 'fish',
        emoji: ':fish:',
        async execute(client, message, args) {
                if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                        return message.channel.send(`${invite.code}`);
                });
        },
};
