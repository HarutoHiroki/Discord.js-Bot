const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
const fs = require("fs");
module.exports = async message => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;

  let cd = new Set();
  let cdseconds = 5;
  
  let client = message.client;
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
  if (!blacklist[message.author.id]) { 
    blacklist[message.author.id] = {state: false}};
    if (blacklist[message.author.id].state === true) return;
  
    let prefix = settings.prefix
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
        console.log("Command: /" + cmd.help.name)
        console.log("Guild: " + message.guild.name)
        return;
      }
      cmd.run(client, message, params, perms);
      console.log("Command: /" + cmd.help.name)
      console.log("Guild: " + message.guild.name)
      if (message.author.id !== "242263403001937920"){
        if(cd.has(message.author.id)){
          message.delete();
          return message.reply("This command is for cd for 5 sec")
        }
      cd.add(message.author.id);
      }
    }
     
    setTimeout(() => {
      cd.delete(message.author.id)
    }, cdseconds * 1000)
};