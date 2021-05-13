// Requires dotenv once, so it does not have to do it every time a shard is started
require('dotenv').config();
const colors = require('colors');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.BOT_TOKEN });

// Starting the created shard
manager.on('shardCreate', shard => console.log('[STATUS]'.green + ` Launched shard ${shard.id}`));
manager.spawn();
