exports.run = async (bot, message, args) => {
    let random = (Math.floor(Math.random() * Math.floor(2)));
    if(random === 0) {
      message.channel.send('Heads!');
    }
    else {
      message.channel.send('Tails!');
    }
},

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'coinflip',
    category: "Fun",
    description: 'Flip a Coin',
    usage: 'coinflip'
  };
  
