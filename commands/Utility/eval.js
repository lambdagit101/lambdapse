module.exports = {
	name: 'eval',
	guildOnly: false,
	aliases: ['dingus'],
	description: 'Executes code.',
	emoji: ':computer:',
	async execute(client, message, args) {
		if (message.author.id == require('../../messages.json').bot_owner) {
			await message.react('🍔');
			try {
				function clean(text) {
					if (typeof(text) === 'string')
						return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
					else
						return text;
					}

				const code = args.join(' ');
				let evaled = eval(code);

				if (typeof evaled !== 'string')
				evaled = require("util").inspect(evaled);

					message.channel.send(clean(evaled), {code:"xl"});
				} catch (err) {
				await message.channel.send(require('../../messages.json').bot_error.replace('(ERROR)', err));
					await message.react('🛑');
			}
		} else {
			await message.react('❌');
		}
	},
};
