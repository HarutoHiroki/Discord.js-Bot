const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

exports.run = (client, message, args, customisation) => {
    randomPuppy('awwnime')
    .then(url => {
        const embed = new Discord.MessageEmbed()
        .setImage(url)
        .setColor('#ff9900')
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        return message.channel.send({ embed });
   })
   }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
  name: 'moe',
  description: 'Sends a random awwnime image',
  category: "Fun",
  usage: 'moe'
};
