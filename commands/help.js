const Discord = require('discord.js')
const help = require('../data/helpMsgs.json');
const settings = require('../settings.json');
const fs = require('fs')
exports.run = (client, message, args, customisation) => {
  if(!args[0]){
      const embed = new Discord.MessageEmbed()
      .addField("All commands have been migrated to here: (mobile not supported, yet.)", "https://is-really.fun/cryptonix/commands")
      .addField("For more info about a specific Command:", "Use [prefix]help command_name")
      .addField("Mod Commands", client.commands.filter((x) => x.help.category === 'Mod').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .addField("Fun Commands", client.commands.filter((x) => x.help.category === 'Fun').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .addField("Music Commands", client.commands.filter((x) => x.help.category === 'Music').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .addField("Useful Commands", client.commands.filter((x) => x.help.category === 'Useful').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .addField("Action Commands", client.commands.filter((x) => x.help.category === 'Action').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .addField("NSFW Commands", client.commands.filter((x) => x.help.category === 'NSFW').map((x) => `\`${x.help.name}\``).join(', ') || "NONE")
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    if (message.author.id === customisation.ownerid) {
      embed.addField("Bot Owner Commands", client.commands.filter((x) => x.help.category === 'Owner').map((x) => `\`${x.help.name}\``).join(', ') || "NONE");
	}
      message.author.send({embed}).catch(e =>{
        if (e) {
        message.channel.send(`Error. You seems to be locking your DMs so I'll send it here instead.`);
        message.channel.send({embed});
        }
	message.reply("Check your DMs!");
      return;
	})
  } else {
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
