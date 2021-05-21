const Discord = require('discord.js')
const settings = require('../settings.json');
const fs = require('fs');
const osutils = require('os-utils');
const version = require('../package.json')

exports.run = async (client, message, customisation) => {

  var milliseconds = parseInt((client.uptime % 1000) / 100),
  seconds = parseInt((client.uptime / 1000) % 60),
  minutes = parseInt((client.uptime / (1000 * 60)) % 60),
  hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  fs.readdir('./commands/', async (err, files) => {
    if (err) console.error(err);
    totcmds = files.length;

    const prefixs = require("../models/settings.js")
    prefixs.findOne({
      guildID: message.guild.id
    }, (err, srid) => {
      let prefix = srid.prefix
      if(!prefix) prefix = "/"

      let globalprefix = settings.prefix;
      osutils.cpuUsage(function(v) {
        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setTimestamp()
        .addField("Cryptonix X Ver.Rewrite", "Show the bot's stats.")
        .addField("-------------------------------------------------------------------------------","----------------------------------------------------------------------------")
        .addField("Server Prefix", prefix, true)
        .addField("Global Prefix", globalprefix, true)
        .addField("Total Commands", `${totcmds} commands`, true)
        .addField("Total Servers", `${client.guilds.cache.size}`, true)
        .addField("Total Channels", `${client.channels.cache.size}`, true)
        .addField("Total Users", `${client.users.cache.size}`, true)
        .addField("Bot Version", version["version"], true)
        .addField("Library", "Discord.js v12", true)
        .addField("Developer", `${customisation.ownername}`, true)
        .addField("-------------------------------------------------------------------------------","----------------------------------------------------------------------------")
        .addField("Platform", osutils.platform(),true)
        .addField("VPS CPU Cores", osutils.cpuCount() + " Cores",true)
        .addField("CPU Usage", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`,true)
        .addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
        .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
        .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
        .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
        .addField("Ping", Math.round(client.ws.ping) + "ms", true)
        .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        message.channel.send({embed});
      })
    })
  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays bot\'s stats.',
  category: "Useful",
  usage: 'stats'
};
