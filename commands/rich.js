const Discord = require('discord.js');
const mongoose = require('mongoose');
const coins = require('../models/coins.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];

exports.run = async (client, message, args) => {
  const cursor = coins.find({}).sort({ 'coins': -1}).collation({locale: "en_US", numericOrdering: true})
  cursor.exec(async (err, result) => {
    if(!result) return console.log('returned')
    if (err) {
        console.error(err);
        return message.channel.send('Sorry an error has occurred!');
    }
    let order = 1
    let lstring = "```"
    for(let i = 0; i < result.length; i++) {
      if(i > result.length - 1) {
        break;
      }
      const user = await client.users.cache.get(`${result[i].userID}`)
     
      if(user != undefined && !user.bot) {
          lstring = lstring + `${order}. ${user.username} - ${result[i].coins} coins\n`
          order++
      }
      if(order > 10) {
        break;
      }
    }
    message.channel.send(`Richest users of **${client.user.username}**:\n` + lstring + "```");
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['richest','millionair','nolife'],
    permLevel: 0
  };
  
exports.help = {
    name: 'rich',
    description: 'Send top 10 richest bot users',
    usage: 'rich'
  };
