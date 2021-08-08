const Discord = require('discord.js, discord-button');

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
        .setColor('#7289da')
        //.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        //.setTimestamp()
        .setDescription('**Click the button below to start**')
      let button = new MessageButton()
        .setStyle('url')
        .setURL(${invite.code}) 
        .setLabel('Poker'); 
      return message.channel.send(embed, button);
    });
  },
};
