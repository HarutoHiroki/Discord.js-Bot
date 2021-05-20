const settings = require('../settings.json');
exports.run = (client, message, args, customisation) => {
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You can\'t throw a hammer at thin air, pick someone you baka.');
  if (message.mentions.users.first().id == client.user.id) return message.channel.send(`No u, ***threws hammer at ${message.mentions.users.first().username}***`)
  if(message.mentions.users.first().id === customisation.ownerid) return message.reply('You can\'t hurt him you pleblord.')
  message.channel.send(`${message.author.username} threw a hammer at ${message.mentions.users.first().username}. :hammer:`)
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hammer',
  description: 'Gives you a hammer to throw at a pleb.',
  category: "Action",
  usage: 'hammer'
};
