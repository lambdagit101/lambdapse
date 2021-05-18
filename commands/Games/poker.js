const Discord = require('discord.js');

module.exports = {
  name: 'poker',
  guildOnly: true,
  aliases: ['poopooker', 'cardgameidfk'],
  description: 'pokah',
  emoji: ':ticket:',
  async execute(client, message, args) {
    if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
    if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Discord Poker Night')
        .setColor(require('../../messages.json').embed_color)
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
        .setDescription(`**[${require('../../messages.json').activity_clickhere}](${invite.code})**`)
      return message.channel.send(embed);
    });
  },
};
