const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const settings = require('../settings.json');
const fs = require('fs')
exports.run = (client, message, args, customisation) => {
  if(!args[0]){
    if (message.author.id === customisation.ownerid) {
      const embed = new Discord.MessageEmbed()
      .addField("All commands have been migrated to here: (mobile not supported, yet.)", "https://is-really.fun/cryptonix/commands")
      .addField("For more info about a specific Command:", "Use [prefix]help command_name")
      .addField("Mod Commands", client.commands.filter((x) => x.help.category === 'Mod').map((x) => `\`${x.name}\``).join(', '))
      .addField("Fun Commands", client.commands.filter((x) => x.help.category === 'Fun').map((x) => `\`${x.name}\``).join(', '))
      .addField("Music Commands", client.commands.filter((x) => x.help.category === 'Music').map((x) => `\`${x.name}\``).join(', '))
      .addField("Useful Commands", client.commands.filter((x) => x.help.category === 'Useful').map((x) => `\`${x.name}\``).join(', '))
      .addField("Action Commands", client.commands.filter((x) => x.help.category === 'Action').map((x) => `\`${x.name}\``).join(', '))
      .addField("NSFW Commands", client.commands.filter((x) => x.help.category === 'NSFW').map((x) => `\`${x.name}\``).join(', '))
      .addField("Bot Owner Commands", client.commands.filter((x) => x.help.category === 'Owner').map((x) => `\`${x.name}\``).join(', '))
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
      .addField("Mod Commands", client.commands.filter((x) => x.help.category === 'Mod').map((x) => `\`${x.name}\``).join(', '))
      .addField("Fun Commands", client.commands.filter((x) => x.help.category === 'Fun').map((x) => `\`${x.name}\``).join(', '))
      .addField("Music Commands", client.commands.filter((x) => x.help.category === 'Music').map((x) => `\`${x.name}\``).join(', '))
      .addField("Useful Commands", client.commands.filter((x) => x.help.category === 'Useful').map((x) => `\`${x.name}\``).join(', '))
      .addField("Action Commands", client.commands.filter((x) => x.help.category === 'Action').map((x) => `\`${x.name}\``).join(', '))
      .addField("NSFW Commands", client.commands.filter((x) => x.help.category === 'NSFW').map((x) => `\`${x.name}\``).join(', '))
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
  category: "Useful",
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
