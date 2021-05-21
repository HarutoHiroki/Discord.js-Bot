const Discord = require('discord.js');
exports.run = (client, message, args, customisation) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  if (user.id === message.author.id) return message.reply("I can't let you do that, self-harm is bad:facepalm:");
  if (user.id === client.user.id) return message.reply("You pleblord, how can you use a bot to kick itself?:joy:");
  
  if (message.mentions.users.first().id === customisation.ownerid) return message.reply("You can't kick my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied';

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  
  const embed = new Discord.MessageEmbed()
  .setColor(0x0000FF)
  .setTimestamp()
  .addField('Action:', 'Kick')
  .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Reason', reason)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  
  if(user.bot) return;
   message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return
  });
  message.guild.member(user).kick();

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
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yeet"],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  category: "Mod",
  usage: 'kick [mention] [reason]'
};
