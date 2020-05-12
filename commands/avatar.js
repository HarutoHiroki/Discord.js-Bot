const Discord =  require('discord.js');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    if (message.mentions.users.size > 0) {
      const embed = new Discord.MessageEmbed()
        .setColor(0xFFFF00)
        .setTitle(`Avatar for ${message.mentions.users.first().username}:`)
        .setImage(`${avatar}`)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        message.channel.send({embed});
    } else {
      const embed = new Discord.MessageEmbed()
      .setColor(0xFFFF00)
      .setTitle(`Avatar for ${message.author.username}:`)
      .setImage(`${avatar + "?size=2048"}`)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      message.channel.send({embed});
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Fetches a user\'s avatar.',
  usage: 'avatar <user>'
};
