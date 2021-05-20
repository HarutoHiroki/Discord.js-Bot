const Discord = require('discord.js');
exports.run = (client, message, args, customisation) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.channel.send('I can\'t let you do that, self-harm is bad:facepalm:');
  if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
  if (message.mentions.users.first().id === customisation.ownerid) return message.channel.send("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Cannor ban that member because they have roles that is higher or equal to you.")
  if (botRolePossition <= rolePosition) return message.channel.send("❌**Error:** Cannor ban that member because they have roles that is higher or equal to me.")
  if (!message.guild.member(user).bannable) {
    message.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
    return
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return
    });
    message.guild.members.ban(user.id, {days:7, reason: reason})
    let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
    if  (!logchannel){
    message.channel.send({embed})
    }else{
      client.channels.cache.get(logchannel.id).send({embed});
      message.channel.send({embed})
    } 
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  category: "Mod",
  usage: 'ban [mention] [reason]'
};
