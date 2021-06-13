const Discord = require('discord.js');
const mongodb = require('mongodb');
const { Levels, enabled, database } = require('../../modules/leveling.js');

module.exports = {
	name: 'preference',
	description: 'Allows you to change leveling preferences.',
	emoji: ':gem:',
  guildOnly: true,
	usage: '[what to change (rank card, level message)] [other arguments based on 1st one]',
	async execute(client, message, args) {
		if (!enabled) return message.channel.send(require('../../messages.json').level_disabled);
		switch(args[0]) {
		  case 'card':
		    	return message.channel.send('coming soon, chief');
		    break;
		  case 'levelmsg':
			    switch(args[1]) {
						case 'show':
							switch(args[2]) {
								case 'dm':
									const msgpref = {
										userid: message.author.id,
										setting: 'levelmsg',
										where: 'dm',
									};
									const based = database.db('leveling');
    							const preferences = based.collection('preferences');
									await preferences.insertOne(msgpref);
									return message.channel.send(require('../../messages.json').level_preferenceset + 'DMs');
								break;
								case 'channel':
									const msgpref = {
										userid: message.author.id,
										setting: 'levelmsg',
										where: 'channel',
									};
									const based = database.db('leveling');
									const preferences = based.collection('preferences');
									await preferences.insertOne(msgpref);
									return message.channel.send(require('../../messages.json').level_preferenceset + 'Message sent in the same channel');
								break;
								default:
									return message.channel.send(require('../../messages.json').level_select);
							}
						break;
						case 'hide':
							const msgpref = {
								userid: message.author.id,
								setting: 'levelmsg',
								where: 'hide',
							};
							const based = database.db('leveling');
							const preferences = based.collection('preferences');
							await preferences.insertOne(msgpref);
							return message.channel.send(require('../../messages.json').level_preferenceset + 'Hidden Level Message');
						break;
						default:
							return message.channel.send(require('../../messages.json').level_select);
					}
		    break;
		  default:
		    return message.channel.send(require('../../messages.json').level_select);
		}
	},
};