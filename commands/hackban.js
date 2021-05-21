const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args, customisation) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  if (args[0] === message.author.id) return message.reply('I can\' let you do that, self-harm is bad :facepalm:');
  if (user === client.user.id) return message.reply("You pleblord, how can you use a bot to ban itself? :joy:");
  if (args[0] === customisation.ownerid) return message.reply("You can't ban my Developer :wink:");
  if (!user) return message.reply('You need to input a User ID');

  if (reason.length < 1) {reason = 'No reason supplied.'};
  //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
  message.guild.members.ban(user, {days:7, reason: reason}).catch(e =>{
    if (e) return message.channel.send("That user has already been banned or I don't have permission or my role isn't high enough!");
  });

  const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'HackBan')
    .addField('User:', `${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator} (${user})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

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
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'hackban',
  description: 'Forcebans a user.',
  category: "Mod",
  usage: 'hackban [user id] [reason]'
};
