require('dotenv').config();
const colors = require('colors');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./shard.js', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => console.log('[STATUS]'.green + ` Launched shard ${shard.id}`));
manager.spawn();
