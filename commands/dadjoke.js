const dadjoke = require('../data/dadjoke.json');
exports.run = (client, message, args) => {
    args = args.join(" ");
    message.channel.send(`${dadjoke[Math.floor(Math.random() * dadjoke.length)]}`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

exports.help = {
    name: "dadjoke",
    description: 'Sends a Horible dad joke that makes you cringe.',
    category: "Fun",
    usage: 'dadjoke'
}
