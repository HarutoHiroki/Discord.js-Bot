const Discord = require('discord.js');

exports.run =  (client, message, args) => {
    message.delete();
    message.channel.send('<a:BirdUpvote:497742633028943882>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["uv"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'upvote',
    description: 'Bird Upvote',
    usage: 'upvote'
  };