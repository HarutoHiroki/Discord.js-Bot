const Discord = require("discord.js");
const fs = require("fs");
const settings = require('../settings.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args, customisation) => {
  const Coins = require('../models/coins.js');
  if(!args[1]) return message.channel.send("You need to specify an ammount");
  let user = message.mentions.users.first();
  if (!user) return message.channel.send("You must mention someone to pay them!");
  if (user === message.author) return message.channel.send("You can't pay yourself coins:facepalm:");
  
  Coins.findOne({
    userID: message.author.id
  }, (err, coins) => {
    if (err) console.error(err);
    if (!coins) {
        const newCoins = new Coins({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            coins: 0,
        });
        newCoins.save()
        return message.reply("You don't have enough coins!")
      }else if(coins.coins < parseInt(args[1])){
        return message.reply("You don't have enough coins!")
      } else {
        coins.coins = parseInt(coins.coins) - parseInt(args[1]);
        coins.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));

        Coins.findOne({
          userID: user.id
        }, (err, coins) => {
          if (err) console.error(err);
          if (!coins) {
              const newCoins = new Coins({
                  _id: mongoose.Types.ObjectId(),
                  userID: user.id,
                  coins: parseInt(args[1]),
              });
              
              newCoins.save()
                  //.then(result => console.log(result))
                  .catch(err => console.error(err));
          }else{
              coins.coins = parseInt(coins.coins) + parseInt(args[1]);
              coins.save()
                  //.then(result => console.log(result))
                  .catch(err => console.error(err));
          }
            
          const embed = new Discord.MessageEmbed()
          .setColor(Math.floor(Math.random()*16777215))
          .addField(`COINSSS!`,`You have paid ${user.username} ${args[1]} coins!`)
          .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
            
          message.channel.send({embed})
        });
      }
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'pay',
    description: 'Pay someone with Coins.',
    category: "Eco",
    usage: 'pay @user amount'
  };
