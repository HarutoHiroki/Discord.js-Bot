const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if(message.mentions.users.first().id === "242263403001937920") return message.reply('You can\'t mute him you pleblord.:facepalm:')
  if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("❌**Error:** You don't have the **Manage Roles** permission!");
  if (!muteRole) {
    try {
        muteRole = await message.guild.createRole({
            name:"Muted",
            color: "#000000",
            permissions:[]
        });

        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muteRole, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch(e) {
        console.log(e.stack);
    }
}
  if (reason.length < 1) reason = 'No reason Supplied';
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .addField('Action:', 'Mute/Unmute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  message.channel.send({embed})

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
  let logchannel = message.guild.channels.find('name', 'logs');
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      if(!logchannel){
        return
      }else{
      client.channels.get(logchannel.id).send({embed}).catch(console.error);
      }
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {if(!logchannel){
      return
    }else{
    client.channels.get(logchannel.id).send({embed}).catch(console.error);
    }
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};
