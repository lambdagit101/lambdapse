module.exports = {
        name: 'poker',
        guildOnly: true,
        aliases: ['poopooker', 'cardgameidfk'],
        description: 'pokah',
        async execute(client, message, args) {
                client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                        return message.channel.send(`${invite.code}`);
                });
        },
};
