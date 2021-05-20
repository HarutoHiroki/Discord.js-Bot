const mongoose = require("mongoose")
exports.run = (client, message, args) => {
  const Coins = require('../models/coins.js')
  let user = message.author
  Coins.findOne({
    userID: user.id
  }, (err, coins) => {
    if(!coins){
      let newcoins = new Coins({
        _id: mongoose.Schema.Types.ObjectId,
        userID: user.id,
        coins: 0,
        lastdaily: 0,
        streak: 0
      })
      newcoins.save()
      message.channel.send(`Baka <@${user.id}>, you don't have any coins yet. Start off with \`daily\` :<`)
    }else{
    
      let money = args[0]
      if (!money) {
      	money = 10;
      }
      if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Valid numbers only! (or do you think you can bet with letters, you baka)`);
      if (money > 2500) return message.reply("Due to disgusting abusers of the casino, you can only bet max 2500 coins ;-;")
      if (parseInt(coins.coins) < money) return message.channel.send(`**${message.author.username}** Scrub you don't even have that much ***smug face***`);
        
      let random = Math.floor(Math.random() * 37);
        
      if (random == 0) { // Jackpot
        money *= 10
        let curBal1 = parseInt(coins.coins)
        coins.coins = curBal1 + money;
        coins.save()
        message.channel.send(`🎲 | **${message.author}**, 🎉🎉 **JACKPOT** You won **${money}**<:coin:706443785546235966> GGWP! 🎉🎉`);
      } else if (random == 5) { // win
        money = money * 2.50
        let curBal2 = parseInt(coins.coins)
        coins.coins = curBal2 + money
        coins.save()
        message.channel.send(`🎲 | GGWP! **${message.author.username}**, You won **${money}**<:coin:706443785546235966> in addition to what you had. 🎉`);
      } else if (random == 10 || random == 15 || random == 20 || random == 25 || random == 30) { // win
        money = money * 2.50
        let curBal2 = parseInt(coins.coins)
        coins.coins = curBal2 + money
        coins.save()
        message.channel.send(`🎲 | GGWP! **${message.author.username}**, You won **${money}**<:coin:706443785546235966> in addition to what you had. 🎉`);
      } else { // Lost
        let curBal5 = parseInt(coins.coins)
        coins.coins = curBal5 - money;
        coins.save()
        message.channel.send(`🎲 | **${message.author.username}**, sadly you lost **${money}**<:coin:706443785546235966>. Better luck next time :<`);
      }
    }
  })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'gamble',
    description: 'Gamble for a chance of winning more coins',
    category: "Eco",
    usage: 'gamble <amount>'
};
