const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  //let logchannel = message.guild.channels.find('name', 'logs');
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.channel.send('I can\' let you do that, self-harm is bad:facepalm:');
  if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
  if (message.mentions.users.first().id === "242263403001937920") return message.channel.send("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';
  //let botRolePosition = message.guild.member(client.user).highestRole.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.highestRole.position;
    if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Cannor ban that member because they have roles that is higher or equal to you.")
  //if (botRolePosition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
  if (!message.guild.member(user).bannable) {
    message.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
    return
  }else{
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    let logchannel = message.guild.channels.find('name', 'logs');
  if  (!logchannel){
    message.channel.send({embed})
    message.channel.send(`:hammer: Done. You don't have to worry about that shit head anymore, I have banned them!`)
  }else{
    message.channel.send(`:hammer:  Done. You don't have to worry about that shit head anymore, I have banned them! Also I\'ve logged the ban in <#${logchannel.id}>.`)
    client.channels.get(logchannel.id).send({embed});
  }
  if(user.bot) return;
  return message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return
  });
}
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
