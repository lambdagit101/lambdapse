const Discord = require('discord.js');

module.exports = {
  name: 'fish',
  guildOnly: true,
  description: 'fish',
  emoji: ':fish:',
  async execute(client, message, args) {
    if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
    if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Fishington.io')
        .setColor(require('../../messages.json').embed_color)
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
        .setDescription(`**[${require('../../messages.json').activity_clickhere}](${invite.code})**`)
      return message.channel.send(embed);
    });
  },
};
