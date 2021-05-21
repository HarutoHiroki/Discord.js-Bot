const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them");
    if (message.mentions.users.first().id === customisation.ownerid) return message.reply('You can\'t hurt him you pleblord.');
    if (message.mentions.users.first().id === client.user.id && message.author.id === customisation.ownerid){
      const { body } = await superagent.get("https://nekos.life/api/v2/img/slap");

      const embed = new Discord.MessageEmbed()
      .setColor("#ff9900")
      .setTitle(`No u! *slaps*${message.mentions.users.first().username}`)
      .setImage(body.url)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      return message.channel.send({embed})
    }else if (message.mentions.users.first().id === client.user.id && message.author.id !== customisation.ownerid){
      return message.channel.send("NUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU **owwie**")
    }
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.mentions.users.first().username} You got slapped by ${message.author.username}`)
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
    name: 'slap',
    description: 'Slaps someone OwO',
    category: "Action",
    usage: 'slap'
};
