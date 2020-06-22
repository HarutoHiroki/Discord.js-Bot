const chalk = require('chalk');
const Discord = require("discord.js");
const fs = require('fs');
module.exports = client => {
  client.user.setActivity(`Online and ready to serve ${client.guilds.size} servers.`, { url: 'https://www.twitch.tv/harutohiroki', type: 'STREAMING' })
  setInterval(() => {
    client.user.setActivity(`Online and ready to serve ${client.guilds.size} servers.`, { url: 'https://www.twitch.tv/harutohiroki', type: 'STREAMING' })
  },60000);

  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.cache.size} servers.`));
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
  client.guilds.cache.forEach((guild) => {
    if (!blacklist[guild.ownerID]) {
      return;
    }else{
      if(blacklist[guild.ownerID].state === true) {
        message.guild.leave(guild.id)
      }
    }
  })
};