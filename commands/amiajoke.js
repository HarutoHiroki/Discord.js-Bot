const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL : message.author.avatarURL;
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setImage(`https://api.alexflipnote.dev/amiajoke?image=` + avatar) 
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
    name: 'amiajoke',
    description: 'Am I A Joke to You?',
    usage: 'amiajoke (w or w/o @mention)'
  };
   