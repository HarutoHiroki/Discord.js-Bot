const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to hug them");
    const { body } = await superagent
    .get("https://nekos.life/api/hug");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.author.username} hugged ${message.mentions.users.first().username}`)
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
    name: 'hug',
    description: 'Hugs someone OwO',
    usage: 'hug'
  };
