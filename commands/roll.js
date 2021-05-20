exports.run = (client, msg) => {
    msg.channel.send(`:game_die: **${msg.author.username}**, you rolled a **${Math.floor(Math.random() * 6) + 1}**!`);
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'roll',
  description: 'Rolls a die.',
  category: "Fun",
  usage: 'roll'
};
