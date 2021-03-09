const fs = require('fs');
const Discord = require('discord.js');

const messages = require('./messages.json');

const { Player } = require("discord-player");

const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports.client = client;

const player = new Player(client);
client.player = player;

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(messages.bot_ready);
});

client.on('message', message => {
	if (!message.content.startsWith(messages.bot_prefix) || message.author.bot) return;

	const args = message.content.slice(messages.bot_prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply(messages.bot_nodms);
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply(messages.bot_noperms);
		}
	}

	if (command.args && !args.length) {
		let reply = messages.bot_usage1;

		if (command.usage) {
			reply += messages.bot_usage2.replace('(PREFIX)', messages.prefix).replace('(COMMAND)', command.name).replace('(USAGE)', command.usage);
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(messages.bot_cooldown.replace('(TIME)', timeLeft.toFixed(1)));
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.channel.send(messages.bot_error.replace('(ERROR)', error));
	}
});

// Music system messages

client.player

// Send a message when a track starts
.on('trackStart', (message, track) => message.channel.send(messages.music_nowplaying.replace('(TRACK)', track.title)))
.on('trackAdd', (message, queue, track) => message.channel.send(messages.music_trackadd.replace('(TRACK)', track.title)))
.on('playlistAdd', (message, queue, playlist) => message.channel.send(messages.music_addplaylist.replace('(TRACKS)', playlist.track.length).replace('(TITLE)', playlist.title)))
.on('searchResults', (message, query, tracks) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(messages.music_search.replace('(QUERY)', query))
    .setColor(messages.embed_color)
    .setTimestamp()
    .setFooter(messages.embed_footer.replace('(NAME)', message.author.username), message.author.avatarURL())
    .setDescription(tracks.map((t, i) => `**${i + 1}. \`${t.title}\`**`))
    message.channel.send(embed);
})
.on('searchInvalidResponse', (message, query, tracks, content, collector) => {

    if (content === 'cancel') {
        collector.stop()
        return message.channel.send(messages.music_searchcancel)
    }

    message.channel.send(messages.music_nosearch.replace('(NUMBER)', tracks.length))

})
.on('searchCancel', (message, query, tracks) => message.channel.send(messages.music_cancel))
.on('noResults', (message, query) => message.channel.send(messages.music_noresults.replace('(QUERY)', query)))
.on('queueEnd', (message, queue) => message.channel.send(messages.music_queueend))
.on('channelEmpty', (message, queue) => message.channel.send(messages.music_everyoneleft))
.on('botDisconnect', (message) => message.channel.send(messages.music_disconnected))
.on('error', (error, message) => {
    switch(error){
        case 'NotPlaying':
            message.channel.send(messages.music_nomusic)
            break;
        case 'NotConnected':
            message.channel.send(messages.music_notinvc)
            break;
        case 'UnableToJoin':
            message.channel.send(messages.music_missingperms)
            break;
        case 'LiveVideo':
            message.channel.send(messages.music_nolive)
            break;
        case 'VideoUnavailable':
            message.channel.send(messages.music_unavailable)
            break;
        default:
            message.channel.send(messages.bot_error.replace('(ERROR)', error))
    }
})

// Do not touch this

client.user.setActivity(messages.status_text, { type: messages.status_type })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

client.login(process.env.BOT_TOKEN);
