const Discord = require('discord.js');
const superagent = require('superagent');
const sf = require("snekfetch");

exports.run = async (client, message, args, customisation) => {
    const { body } = await superagent
    .get("http://aws.random.cat/meow");

    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Here's Your Cat")
    .setImage(body.file) 
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'cat',
    description: 'Sends a random cat',
    category: "Fun",
    usage: 'cat'
  };
   
