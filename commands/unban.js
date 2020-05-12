const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  client.unbanAuth = message.author;
  let user = args[0];
  let reason = args.slice(1).join(' ');
  if (reason.length < 1) reason = 'No reason supplied.';
  if (!user) return message.channel.send('You must supply a User Resolvable, such as a user id.').catch(console.error);
  message.guild.members.unban(user, reason).catch(e =>{
    if(e){
      return message.channel.send(`${client.users.cache.get(`${args[0]}`).username} isn't banned, YET :wink:`);
    }
  }).then(() =>{
    const embed = new Discord.MessageEmbed()
      .setColor(0xFF0000)
      .setTimestamp()
      .addField('Action:', 'Unban')
      .addField('User:', `${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator} (${user})`)
      .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Reason', reason)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

    const settings = require("../models/settings.js")
    settings.findOne({
      guildID: message.guild.id
    }, (err, settings) =>{
      let logs = settings.logs
      let logchannel = settings.logchannel;
      if  (logs == true && logchannel !== 'none'){
        message.channel.send(`${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator} has been unbanned. Also I've logged it in <#${logchannel}>.`)
        if(client.channels.cache.get(logchannel)) client.channels.cache.get(logchannel).send({embed});
      }else{
        return message.channel.send(`${client.users.cache.get(`${args[0]}`).username}#${client.users.cache.get(`${args[0]}`).discriminator} has been unbanned`);
      }
    })
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban [mention] [reason]'
};
