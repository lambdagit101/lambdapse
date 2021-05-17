const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'hentai',
	description: 'Fuck real women, if they ever existed',
	emoji: 'jan',
	usage: '[category (optional)/help]',
	cooldown: 5,
	async execute(client, message, args) {
		if (!message.channel.nsfw) return message.channel.send(require('../../messages.json').no_nsfw);
		var gif = '';
		const embed = new Discord.MessageEmbed()
				.setTitle(require('../../messages.json').nsfw_hentaihere.replace('(TAG)', `${message.author.tag}`))
				.setColor(require('../../messages.json').embed_color)
				.setFooter(require('../../messages.json').embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
				.setTimestamp()
		switch(args[0]) {
			case 'neko':
				gif = await fetch('https://nekos.life/api/v2/img/nsfw_neko_gif').then(response => response.json());
				embed.setImage(gif.url)
			break;
			case 'cum':
					gif = await fetch('https://nekos.life/api/v2/img/cum').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'solo':
					gif = await fetch('https://nekos.life/api/v2/img/solo').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'anal':
					gif = await fetch('https://nekos.life/api/v2/img/anal').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'yuri':
					gif = await fetch('https://nekos.life/api/v2/img/yuri').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'blowjob':
					gif = await fetch('https://nekos.life/api/v2/img/bj').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'bj':
					gif = await fetch('https://nekos.life/api/v2/img/bj').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'pussy':
					gif = await fetch('https://nekos.life/api/v2/img/pussy').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'classic':
					gif = await fetch('https://nekos.life/api/v2/img/hentai').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'futa':
					gif = await fetch('https://nekos.life/api/v2/img/futanari').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'futanari':
					gif = await fetch('https://nekos.life/api/v2/img/futanari').then(response => response.json());
					embed.setImage(gif.url)
			break;
			case 'help':
					embed.setTitle(require('../../messages.json').nsfw_availablecategories)
					embed.setDescription(require('../../messages.json').nsfw_categorieshentai)
			break;
			default:
					gif = await fetch('https://nekos.life/api/v2/img/Random_hentai_gif').then(response => response.json());
					embed.setImage(gif.url)
					embed.setDescription(require('../../messages.json').nsfw_hentainocategory.replace('(PREFIX)', require('../../messages.json').bot_prefix))
		}
		message.channel.send(embed);
	},
};
