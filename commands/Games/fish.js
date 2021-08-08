const Discord = require('discord.js');

module.exports = {
  name: 'fish',
  guildOnly: true,
  description: 'fish fish',
  emoji: ':fish:',
  async execute(client, message, args) {
    if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
    if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Fish')
        .setColor('#c5db13')
        //.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        //.setTimestamp()
        .setDescription('**Click the button below to start**')
      let button = new MessageButton()
        .setStyle('url')
        .setURL(${invite.code}) 
        .setLabel('Fish'); 
      return message.channel.send(embed, button);
    });
  },
};
