const Discord = require('discord.js');
exports.run = (client, message, args, customisation) => {
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

      let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
      if  (!logchannel){
      message.channel.send({embed})
      }else{
        client.channels.cache.get(logchannel.id).send({embed});
        message.channel.send({embed})
      }
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
  category: "Mod",
  usage: 'unban [mention] [reason]'
};
