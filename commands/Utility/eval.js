module.exports = {
	name: 'eval',
  guildOnly: false,
  aliases: ['dingus'],
	description: 'Executes code.',
	guildOnly: true,
	async execute(client, message, args) {
		if (message.author.id == require('../../messages.json').bot_owner) {
      await message.react('🍔');
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

          message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
          message.channel.send(require('../../messages.json').bot_error.replace('(ERROR)'));
      }
    } else {
      await message.react('❌');
    }
	},
};
