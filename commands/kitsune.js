const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation, tools) => {
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/fox_girl");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, Here's your Fox Girl`)
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
    name: 'kitsune',
    description: 'Kitsunes OwO',
    category: "Fun",
    usage: 'kitsune'
  };
