const Discord = require('discord.js, discord-buttons');

module.exports = {
  name: 'amongus clone',
  guildOnly: true,
  aliases: ['betrayal, amongus, amogus'],
  description: 'Sus.',
  emoji: ':fire_extinguisher:',
  async execute(client, message, args) {
    if (require('../../modules/activities.js').enabled == false) return message.channel.send(require('../../messages.json').activity_disabled);
    if (!message.member.voice.channel) return message.channel.send(require('../../messages.json').music_notconnected);
      client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
        const embed = new Discord.MessageEmbed()
          .setTitle('Amongus Online (betrayal.io)')
        .setColor('#db1313'
        //.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        //.setTimestamp()
        .setDescription('**Click the button below to start**')
      let button = new MessageButton()
        .setStyle('url')
        .setURL(${invite.code}) 
        .setLabel('Among Us'); 
      return message.channel.send(embed, button);
      });
    },
};
