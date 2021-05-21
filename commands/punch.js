exports.run = (client, message, customisation) => {
  var owner = customisation.ownerid
  if(message.author.id !== owner) return message.reply("Disabled until I can find a suitable API ;-;")
  let user = message.mentions.users.first();
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to punch them.')
  if(user.id === message.author.id) return message.channel.send("https://tenor.com/view/why-huh-but-why-gif-13199396")
  if(user.id === owner) return message.reply("You can't hurt him you pleblord.");
  if(user.id === client.user.id) return message.channel.send(`**Punches ${user.username}**`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'punch',
  description: 'Punches a user.',
  category: "Action",
  usage: 'punch <user>'
};
