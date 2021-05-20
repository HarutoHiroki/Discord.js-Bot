const Discord = require('discord.js');
exports.run = (client, msg, args, customisation) => {
  msg.delete();
  const embed = new Discord.MessageEmbed()
  .setColor(0xFFFF00)
  .addField('About The Bot', `Cryptonix is a bot created by ${customisation.ownername}, made for any discord server that needs moderating. It is written with Discord.js. To see more info about the bot, type /info in <#556351532531187732>`)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  msg.channel.send({embed});
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
  name: 'about',
  description: 'About the bot.',
  usage: 'about',
  category: "Useful"
};
