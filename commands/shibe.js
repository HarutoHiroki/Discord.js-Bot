const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation) => {
   const { body } = await superagent
  .get(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)

  const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Here's Your Shibe")
    .setImage(body[0])
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
    name: 'shibe',
    description: 'Sends a random shibe',
    category: "Fun",
    usage: 'shibe'
  };
