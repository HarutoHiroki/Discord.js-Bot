const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  if (!message.mentions.users.first()) return message.reply("You need to Mention someone to soft ban them!");
  let user = message.mentions.users.first().id;
  let logchannel = message.guild.channels.find('name', 'logs');
  if (!logchannel) return message.reply('I cannot find a logs channel');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to soft ban them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';

  if (!message.guild.member(user).bannable) return message.reply(`:redTick: I cannot ban that member`);
  message.guild.member(user).ban(reason);
  message.guild.unban(user, {reason: reason.length < 1 ? 'No reason supplied.': reason});

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', ' Soft Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.mentions.users.first().send({embed});
    message.channel.send(`:hammer: Done. <@${user.id}> has been Softbanned`);
  return client.channels.get(logchannel.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'softban',
  description: 'Soft Bans the mentioned user.',
  usage: 'softban [mention] [reason]'
};
