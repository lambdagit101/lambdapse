module.exports.name = "Discord Leveling System"

// If set to true, leveling will work.
const enabled = true

// If set to true, it will send a message when someone levels up
const messagewhen = false

// Message that will be sent when someone levels up (does not matter if above is false)
const theactualmessage = "**(TAG)**, you have advanced to level **(LEVEL)**!"

// The Minimum and Maximum amount of XP someone can get per message
const minxp = 1;
const maxxp = 30;

// airpod shotty
var colors = require('colors');

const Levels = require("discord-xp");
Levels.setURL(process.env.LEVEL_DBURL);
module.exports.Levels = Levels;
module.exports.enabled = enabled;

if (!enabled) return console.log('[INFO]'.blue + ' Leveling module is ' + 'DISABLED'.red);
if (enabled) console.log('[INFO]'.blue + ' Leveling module is ' + 'ENABLED'.green);
client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const randomAmountOfXp = Math.floor(Math.random() * (maxxp - minxp) + minxp);
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    if (messagewhen) return message.channel.send(theactualmessage.replace('(TAG)', message.author.tag).replace('(LEVEL)', user.level));
  }
});
