module.exports.name = 'Discord-IRC Integration';

// Lambdapse Discord-IRC Integration
// This requires package irc from npm
// So first you have to install that before setting this up
// If you want to link other channels on both ends, make a copy of this file, and make sure to change the Discord channel ID

// Discord-related stuff

// Channel ID. Where will the bot send messages and listen for messages
const discordchannel = '837435373239795744';
// How will the message show up on Discord
// Example:
// donkeykong50 => #forest: Oh, these are pretty cool bananas
const ircmsgformat = '`**(NAME)** => **(CHANNEL):** (MESSAGE)`';

// IRC-related stuff

// What server will the bot connect to?
const server = 'irc.freenode.net';
// The bot's nickname in the IRC server
const nick = require('../messages.json').bot_name;
// Which channel should it connect to
const ircchannel = '#freenode';
// How will the message show up on IRC
// Example:
// donkeykong#6969: Oh, these are pretty cool bananas
const discordmsgformat = '`(TAG): (MESSAGE)`';
// Is this module enabled?
// If this is set to false, the module will do nothing
// If set to true, the module will listen for messages in both IRC and Discord. Useful if you have an IRC server/channel on freenode
const enabled = false;

// Code for the module

if (enabled == true) {
  const colors = require('colors');
  console.log('[INFO]'.blue + ' IRC module is ' + 'ENABLED'.green);
  const irc = require('irc');
  const discordclient = require('../shard.js').client;

  const ircclient = new irc.Client(server, nick, {
    channels: channel,
  });

  ircclient.addListener('message', function (from, to, message) {
      const configchannel = discordclient.channels.cache.get(discordchannel);
      configchannel.send(ircmsgformat.replace('(NAME)', from).replace('(CHANNEL)', to).replace('(MESSAGE)', message).replace(/@everyone/g, '(a)everyone').replace(/@here/g, '(a)here'));
  });

  discordclient.on(message, async (message) => {
    if (message.channel.id !== discordchannel || message.author.bot) return;
    ircclient.say(ircchannel, discordmsgformat.replace('(TAG)', message.author.tag).replace('(MESSAGE)', message.content));
  })

  process.on('SIGTERM', () => {
    client.part(ircchannel);
    console.log('[STATUS]'.green + ` Left channel ${ircchannel}`);
  })

} else {
  console.log('[INFO]'.blue + ' IRC module is ' + 'DISABLED'.red);
}
