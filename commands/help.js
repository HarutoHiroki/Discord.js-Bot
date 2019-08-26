const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const customisation = require('../customisation.json');
const settings = require('../settings.json');
const fs = require('fs')
exports.run = (client, message, args) => {
  if(!args[0]){
      message.author.send("***Moderation***\n" + `${help.helpMsg1}` + "\n" + "***Usefull***\n" + `${help.helpMsg2}`)
      message.author.send("***Fun***\n"+`${help.helpMsg3}`+"***Action***\n"+`${help.helpMsg4}`)
      .catch(e =>{
        if (e) {
        message.channel.send(`Error. You seems to be locking your DMs so I'll send it here instead.`);
        message.channel.send("***Moderation***\n" + `${help.helpMsg1}` + "\n" + "***Usefull***\n" + `${help.helpMsg2}`)
        message.channel.send("***Fun***\n"+`${help.helpMsg3}`+"***Action***\n"+`${help.helpMsg4}`)
      }
      });
    }else{
      let command = args[0];
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
        return message.channel.send("```" + `\n` + "Description: " + cmd.help.description + `\n` + "Usage: " + cmd.help.usage + "```")
      } else {
        return message.reply("That command doesn't exist!")
      }
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
