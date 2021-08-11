const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');

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
          .setTitle('Chess)')
		  .setColor('#2013d8')
          .setFooter('dahon bot')
          .setDescription('**Click the button below to start**');
		const button = new MessageButton()
			.setStyle('url')
			.setURL(`${invite.code}`)   
			.setLabel('Chess');
      return message.channel.send({embed: embed, button: button});
      });
    },
};
