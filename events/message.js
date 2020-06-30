const Discord = require('discord.js');
const config = require('../settings.json');
const fs = require("fs");
const superagent = require('superagent');
const mongoose = require('mongoose');
module.exports = async message => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;

  let cd = new Set();
  let cdseconds = 5;
  
  let client = message.client;
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));

  const settings = require("../models/settings.js");

  settings.findOne({
    guildID: message.guild.id
  }, async (err, settings) => {
    let alt = require('../settings.json')
    if (!settings){
      prefix = alt.prefix
      if(!message.content.startsWith(prefix)) return
      if(message.content.startsWith(prefix)){
        let command = message.content.split(' ')[0].slice(prefix.length);
        if (client.commands.has(command)) {
          if(!message.content.startsWith(prefix + "settings")) return message.channel.send(`Please run ${alt.prefix}settings to set up the bot first!`)
        } else if (client.aliases.has(command)) {
          if(!message.content.startsWith(prefix + "settings")) return message.channel.send(`Please run ${alt.prefix}settings to set up the bot first!`)
        }
      }
      let command = message.content.split(' ')[0].slice(prefix.length);
      let params = message.content.split(' ').slice(1);
      let perms = client.elevation(message);
      let cmd;
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
      }
      if (cmd) {
        if (perms < cmd.conf.permLevel) {
          console.log(`Command: ${alt.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
          return;
        }
        
        cmd.run(client, message, params, perms);
        console.log(`Command: ${alt.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        if (message.author.id !== "242263403001937920"){
          if(cd.has(message.author.id)){
            message.delete();
            return message.reply("This command is for cooldown for 5 sec")
          }
        cd.add(message.author.id);
        }
      }
      setTimeout(() => {
        cd.delete(message.author.id)
      }, cdseconds * 1000)
      
    }else{
      let prefix = settings.prefix;

      let channelignore = settings.channelignorestat;
      if(channelignore === true){
        for(i = 1; i <= String(settings.channelignore).split(",").length; i++){
          let channel = String(settings.channelignore).split(",")[i-1];
          if (!message.member.hasPermission("MANAGE_ROLES") && message.guild.channels.cache.get(channel) === message.channel){
            return;
          }
        }
      }
      
      if (!blacklist[message.author.id]) {
        blacklist[message.author.id] = {state: false}
      };

      if (blacklist[message.author.id].state === true) return;

      if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)){
        if(message.content.includes('prefix')) return message.reply(`My current prefix is ${settings.prefix}`)
        if(settings.chatbot == true){
          message.channel.startTyping();
          //message.reply("I Hear You!")
          let string = message.content.split(' ').slice(1).join("%20");
          //console.log(string)
          const { body } = await superagent
            .get("https://some-random-api.ml/chatbot?message=" + string)
            .catch(e => {
              if(e){
                message.channel.stopTyping();
                return message.channel.send(`The API made a fucky wucky and broke! \n\`Error: ${e}\``)
              }
            })
          message.reply(body.response)
          .then(message => {
            message.channel.stopTyping();
            return;
          })
        }
      }

      const Coins = require('../models/coins.js');

      function generatecoins(){
        return Math.floor(Math.random() * 15) + 1
      }

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      if (!message.content.startsWith(prefix)){
        if (parseInt(getRandomInt(4)) == 3) {
        Coins.findOne({
          userID: message.author.id,
        }, (err, coins) => {
          if (err) console.error(err);
          if (!coins) {
              const newCoins = new Coins({
                  _id: mongoose.Types.ObjectId(),
                  userID: message.author.id,
                  coins: generatecoins(),
                  lastdaily: Math.round((new Date()).getTime() / 1000),
                  streak: 0
              });
            
              newCoins.save()
                  .catch(err => console.error(err));
          }else{
              coins.coins = parseInt(coins.coins) + parseInt(generatecoins());
              coins.save()
                  .catch(err => console.error(err));
          }
          })
        }
      }

      if (!message.content.startsWith(prefix)) return;  
      let command = message.content.split(' ')[0].slice(prefix.length);
      let params = message.content.split(' ').slice(1);
      let perms = client.elevation(message);
      let cmd;
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
      }
      if (cmd) {
        if (perms < cmd.conf.permLevel) {
          console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
          return;
        }
        cmd.run(client, message, params, perms);
        console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        if (message.author.id !== config.ownerid){
          if(cd.has(message.author.id)){
            message.delete();
            return message.reply("This command is for cd for 5 sec")
          }
          cd.add(message.author.id);
        }
      }

      setTimeout(() => {
        cd.delete(message.author.id)
      }, cdseconds * 5000)
    }
  })
};