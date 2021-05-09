module.exports.name = "Discord VC Activities";

const client = require('../bot.js').client;
const messages = require('../messages.json');

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
console.log('[INFO]'.blue + ' Discord Activities - Allows people to watch YouTube or play games together');
