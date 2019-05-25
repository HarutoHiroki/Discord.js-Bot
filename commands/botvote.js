const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run =  (client, message, args) => {
  message.delete();
  let embed = new Discord.RichEmbed()
    .setTitle("Vote for Cryptonix X!")
    .addField("Voting on discordbots.org:", "https://discordbots.org/bot/482128001828651008")
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  message.channel.send({embed});
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bv"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'botvote',
    description: 'Vote for the bot on Discordbots.org',
    usage: 'botvote'
  }
  //https://discordbots.org/bot/482128001828651008