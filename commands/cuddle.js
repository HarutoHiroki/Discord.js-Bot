const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, customisation, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to cuddle them");
    if (message.mentions.users.first().id == client.user.id && message.author.id !== customisation.ownerid) return message.channel.send("Aww! *cuddles you* ")
    if (message.mentions.users.first().id == client.user.id && message.author.id === customisation.ownerid) return message.reply(">///< *cuddles dev-san*")
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/cuddle");

    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.author.username} cuddled ${message.mentions.users.first().username} OwO`)
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
    name: 'cuddle',
    description: 'Cuddles someone OwO',
    category: "Action",
    usage: 'cuddle'
  };
