module.exports.name = "Discord Music System";

// Disable music system if this is false
const enabled = true;

// Do not touch anything
module.exports.enabled = enabled;

if (enabled == false) return console.log('[INFO]'.blue + ' Discord Music System is ' + 'DISABLED'.red);
if (enabled == true) console.log('[INFO]'.blue + ' Discord Music System is ' + 'ENABLED'.green);

const client = require('../shard.js').client;
const messages = require('../messages.json');

const Discord = require('discord.js');

const { Player } = require("discord-player");

const player = new Player(client);
client.player = player;

client.player.enableLive = true;

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
