const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation, tools) => {
    const { body } = await superagent
    .get("https://nekos.life/api/neko");
    link = body.neko;
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Here's Your Neko OwO")
    .setImage(body.neko) 
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
    name: 'neko',
    description: 'Sends a random Neko OwO',
    category: "Fun",
    usage: 'neko'
  };
