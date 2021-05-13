module.exports.name = "Discord Leveling System";

// If set to true, leveling will work.
const enabled = true;

// If set to true, it will send a message when someone levels up
const messagewhen = false;

// Message that will be sent when someone levels up (does not matter if above is false)
const theactualmessage = '**(TAG)**, you have advanced to level **(LEVEL)**!';

// Should the message when you got XP be sent in the same channel or a specific one? Not required if above is false
const sendtochannel = false;
const channelid = "required if above is true";

// The Minimum and Maximum amount of XP someone can get per message
const minxp = 15;
const maxxp = 25;

// Enable MEE6 type leveling? It will have a cooldown after every message
// This prevents XP earned from spamming the bot and balances the "level economy" more
const mee6leveling = true;

// The MEE6 type leveling cooldown in miliseconds for when you can earn XP. Not required if above is false
const mee6cooldown = 60000;

// Do not touch the things below

var colors = require('colors');
module.exports.enabled = enabled;
if (!enabled) return console.log('[INFO]'.blue + ' Leveling module is ' + 'DISABLED'.red);
if (enabled) console.log('[INFO]'.blue + ' Leveling module is ' + 'ENABLED'.green);
const Levels = require("discord-xp");
Levels.setURL(process.env.LEVEL_DBURL);
module.exports.Levels = Levels;
const client = require('../bot.js').client;

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith(require('../messages.json').bot_prefix)) return;

  if (mee6leveling && !message.author.cooldown) {
    message.author.cooldown = true
    const randomAmountOfXp = Math.floor(Math.random() * (maxxp - minxp) + minxp);
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      if (messagewhen) {
        if (!sendtochannel) return message.channel.send(theactualmessage.replace('(TAG)', message.author.tag).replace('(LEVEL)', user.level));
        const channel = client.channels.cache.get(channelid);
        channel.send(theactualmessage.replace('(TAG)', message.author.tag).replace('(LEVEL)', user.level));
      }
    }
    setTimeout(function() {
      message.author.cooldown = false
    }, mee6cooldown)
  } else if (!mee6leveling) {
    const randomAmountOfXp = Math.floor(Math.random() * (maxxp - minxp) + minxp);
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      if (messagewhen) {
        if (!sendtochannel) return message.channel.send(theactualmessage.replace('(TAG)', message.author.tag).replace('(LEVEL)', user.level));
        const channel = client.channels.cache.get(channelid);
        channel.send(theactualmessage.replace('(TAG)', message.author.tag).replace('(LEVEL)', user.level));
      }
    }
  } else if (mee6leveling && message.author.cooldown) {
    return;
  }
});
