const Discord = require('discord.js')
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = (client, message) => {
  let info = JSON.parse(fs.readFileSync("./halloffame.json", "utf8"));
  const embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTitle("Cryptonix Contributors:", '')
  .addField('ULTIMATE FAM (Owner)', customisation.ownername)
  .addField('Big Fam:', info.bigfam)
  .addField('Smol Fam:', `Do /suggest <suggestion> or /bug <bug> and if you got approved you will be listed on this list! \n\n${info.smolfam}`)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  message.channel.send({embed});
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hof'],
  permLevel: 0
};

exports.help = {
  name: 'credits',
  description: 'Bot contributors!',
  usage: 'credits'
};
