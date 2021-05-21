const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to feed them!");
    if (message.mentions.users.first().id == client.user.id && message.author.id !== customisation.ownerid) return message.channel.send("I don't eat tho")
    if (message.mentions.users.first().id == client.user.id && message.author.id === customisation.ownerid) return message.reply("Baka Dev-san you know bots don't eat >///< Now give me more RAM :3")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed");

    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.mentions.users.first().username}, you got fed by ${message.author.username} OwO`)
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
    category: "Fun",
    usage: 'feed'
  };
