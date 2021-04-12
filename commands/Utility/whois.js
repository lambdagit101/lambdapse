const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'whois',
  guildOnly: false,
  aliases: ['ip'],
  description: 'Returns information about an IP address.',
  usage: '[ip address]',
  async execute(client, message, args) {
    const whois = await fetch(`http://ip-api.com/json/${message.content.split('!')[1]}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,timezone,currency,isp,org,as,mobile,proxy,hosting,query`).then(response => response.json());
    if (whois.status == 'fail') {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
            .setTimestamp()
            .setTitle(`Retrieving data for ${message.content.split('!')[1]} failed`)
            .setDescription(whois.message)
        message.channel.send(embed);
        return;
    }
    const embed = new Discord.MessageEmbed()
        .setTitle('Results')
        .setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
        .setTimestamp()
        .setColor(require('../../messages.json').embed_color)
        .addFields(
            { name: 'IP', value: whois.query, inline: true },
            { name: 'Country', value: `${whois.country} (${whois.countryCode})`, inline: true },
            { name: 'Region', value: `${whois.regionName} (${whois.region})`, inline: true },
            { name: 'City', value: whois.city, inline: true },
            { name: 'Zip code', value: whois.zip, inline: true },
            { name: 'Time zone', value: whois.timezone, inline: true },
            { name: 'Continent', value: `${whois.continent} (${whois.continentCode})`, inline: true },
            { name: 'Currency', value: whois.currency, inline: true },
            { name: 'ISP', value: whois.isp, inline: true }
        )
        if (whois.proxy == true) {
            embed.addFields({ name: 'Additional information', value: 'This is a Tor/VPN/Proxy IP' })
        } else if (whois.mobile == true) {
            embed.addFields({ name: 'Additional information', value: 'This IP is used by mobile data' })
        } else if (whois.hosting == true) {
            embed.addFields({ name: 'Additional information', value: 'This is a hosting service/datacenter IP' })
        }
    message.channel.send(embed);
  },
};
