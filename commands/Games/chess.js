const Discord = require('discord.js, discord-buttons');

module.exports = {
  name: 'chess',
  guildOnly: true,
  description: 'the',
  emoji: ':chess_pawn:',
  async execute(client, message, args) {
    if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
    if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
      client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
        const embed = new Discord.MessageEmbed()
          .setTitle('Discord Chess')
        .setColor('#56db13')
        //.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        //.setTimestamp()
        .setDescription('**Click the button below to start**')
      let button = new MessageButton()
        .setStyle('url')
        .setURL(${invite.code}) 
        .setLabel('Chess'); 
      return message.channel.send(embed, button);
      });
    },
};
