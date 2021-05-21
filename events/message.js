const Discord = require('discord.js');
const config = require('../settings.json');
const customisation = require('../data/customisation.json');
const fs = require("fs");
const superagent = require('superagent');
const mongoose = require('mongoose');
  let cd = new Set();
  let cdseconds = 5;
module.exports = async message => {
  let client = message.client;
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;


  const userData = require("../models/User.js");
  userData.findOne({
    userID: message.author.id,
  }, async (err, blacklist) => {
    if (blacklist === true) return;
    })

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
      let params = message.content.slice(prefix.length).split(/\s+/);
      let command = params.shift();
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

        cmd.run(client, message, params, perms, customisation);
        console.log(`Command: ${alt.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        if (message.author.id !== customisation.ownerid){
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

      if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)){
        if(message.content.includes('prefix')) return message.reply(`My current prefix is ${settings.prefix}`)
      }

      function generatecoins(){
        return Math.floor(Math.random() * 15) + 1
      }

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      if (!message.content.startsWith(prefix)){
        if (parseInt(getRandomInt(4)) == 3) {
      const Coins = require('../models/coins.js');

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
        cmd.run(client, message, params, customisation);
        console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        if (message.author.id !== customisation.ownerid){
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
}
