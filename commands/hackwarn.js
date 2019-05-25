const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  //let logchannel = message.guild.channels.find('name', 'logs');
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
  if (user === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (user === "242263403001937920") return message.reply("You can't warn my Developer:wink:");
  if (!user) return message.reply('You must provide a user ID.').catch(console.error);
  if (user === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  //if (!logchannel) return message.reply('I cannot find a warn logs channel');
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (reason.length < 1) reason = 'No reason supplied.';
  
  if(!warns[`${user}, ${message.guild.id}`]) warns[`${user}, ${message.guild.id}`] = {
    warns: 0
  };

  warns[`${user}, ${message.guild.id}`].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if(err) throw err;
  });

  const embed = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setTimestamp()
  .addField('Action:', 'Hack Warn')
  .addField('User:', `${client.users.get(`${args[0]}`).username}#${client.users.get(`${args[0]}`).discriminator}`)
  .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Number of warnings:', warns[`${user}, ${message.guild.id}`].warns)
  .addField('Reason', reason)
  .addField('Logged in:', '<#' + logchannel.id +'>')
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  let logchannel = message.guild.channels.find('name', 'logs');
    if  (!logchannel){
      
      message.channel.send({embed})
  }else{
    
    client.channels.get(logchannel.id).send({embed});
  }
  /*if(warns[user].warns == 2){
    let muteRole = message.guild.roles.find('name', 'Muted')

    let mutetime = "60s";
    await(user.addRole(muteRole.id));
    message.reply(`<@${user}> has been temporarily muted`);

    setTimeout(function(){
      user.removeRole(muteRole.id)
    }, ms(mutetime))
  }

  if(warns[user].warns == 3){
    message.guild.member(user).kick(reason);
    message.reply('That Dumb Boi have been kicked :facepalm:')
  }*/

  if(warns[`${user}, ${message.guild.id}`].warns == 5){
    message.guild.member(user).ban(reason);
    message.channel.send('You won\'t have to worry about that shithead any longer, I have Banned them!');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hackwarn',
  description: 'Issues a warning to the user ID.',
  usage: 'hackwarn [UserID] [reason]'
};
