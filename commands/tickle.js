const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools, customisation) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to tickle them");
    if(message.mentions.users.first().id === customisation.ownerid) return message.reply('You can\'t tickle him. He will explode on impact!');
    if (message.mentions.users.first().id == client.user.id) return message.channel.send("Nuuuuuuuuuuuuuuuuuuuuuu that tickless")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/tickle");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.mentions.users.first().username}, you got tickled by ${message.author.username}`)
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
    name: 'tickle',
    description: 'Tickles someone OwO',
    category: "Action",
    usage: 'tickle'
  };
