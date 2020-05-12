const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const customisation = require('../customisation.json');
const settings = require('../settings.json');
const fs = require('fs')
exports.run = (client, message, args) => {
  if(!args[0]){
    if (message.author.id === settings.ownerid) {  
      const embed = new Discord.MessageEmbed()
      .addField("All commands have been migrated to here: (mobile not supported, yet.)", "https://is-really.fun/cryptonix/commands")
      .addField("For more info about a specific Command:", "Use [prefix]help command_name")
      .addField("Moderation:", help.helpMsg1)
      .addField("Music:", help.helpMsg2)
      .addField("Fun:", help.helpMsg3)
      .addField("Useful:", help.helpMsg4)
      .addField("Action:", help.helpMsg5)
      .addField("NSFW:", help.helpMsg6)
      .addField('Bot Owner Commands', help.helpMsg7)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      message.author.send({embed}).catch(e =>{
        if (e) {
        message.channel.send(`Error. You seems to be locking your DMs so I'll send it here instead.`);
        message.channel.send({embed});
        }
      });
      message.reply("Check your DMs!");
    }else{
      const embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random()*16777215))
      .setTitle("Command list for Cryptonix:", '')
      .addField("All commands have been migrated to here:", "https://is-really.fun/cryptonix/commands")
      .addField("For more info about a specific Command:", "Use [prefix]help command_name")
      .addField("Moderation:", help.helpMsg1)
      .addField("Music:", help.helpMsg2)
      .addField("Fun:", help.helpMsg3)
      .addField("Useful:", help.helpMsg4)
      .addField("Action:", help.helpMsg5)
      .addField("NSFW:", help.helpMsg6)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      message.author.send({embed}).catch(e =>{
        if (e) {
        message.channel.send(`Error. You seems to be locking your DMs so I'll send it here instead.`);
        message.channel.send({embed});
        }
      });
      message.reply("Check your DMs!");
    }
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
