const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to feed them XDDD");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.mentions.users.first().username}, you got fed by ${message.author.username}`)
    .setImage(body.url) 
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'feed',
    description: 'Feeds someone OwO',
    usage: 'feed'
  };