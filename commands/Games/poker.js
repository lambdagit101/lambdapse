module.exports = {
        name: 'poker',
        guildOnly: true,
        aliases: ['poopooker', 'cardgameidfk'],
        description: 'pokah',
        emoji: ':ticket:',
        async execute(client, message, args) {
                if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                        return message.channel.send(`${invite.code}`);
                });
        },
};
