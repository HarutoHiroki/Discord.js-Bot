exports.run = (client, message, args, customisation) => {
    if(message.author.id !== customisation.ownerid) return message.channel.send(`**»** ${message.author}, you don't have permission to do that❌`);
    let id = args[0];
    if (!id) id = message.guild.id;
    client.guilds.get(id).leave()
    .then(g => console.log(`Left ${g}`))
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
  };

exports.help = {
  name: 'leave',
  description: 'Leave the server that the bot is in.',
  category: "Owner",
  usage: 'leave'
};

