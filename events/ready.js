const chalk = require('chalk');
const Discord = require("discord.js");
const fs = require('fs');
module.exports = client => {
  client.user.setActivity(`Online and ready to serve ${client.guilds.cache.size} servers.`, { url: 'https://www.twitch.tv/harutohiroki', type: 'STREAMING' })
  setInterval(() => {
    client.user.setActivity(`Online and ready to serve ${client.guilds.cache.size} servers.`, { url: 'https://www.twitch.tv/harutohiroki', type: 'STREAMING' })
  },60000);

  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));

  client.guilds.cache.forEach((guild) => {
  const userData = require("../models/User.js");
  userData.findOne({
    userID: guild.ownerID,
  }, async (err, blacklist) => {
    if (blacklist === true){
        message.guild.leave(guild.id)
    	}
    })
});
}
