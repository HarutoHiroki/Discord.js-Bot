const moment = require('moment');
const Discord = require('discord.js');
const customisation = require('../customisation.json');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};
exports.run = async (client, msg, args) => {
  let user = msg.mentions.users.first();
  let muser = msg.guild.member(msg.mentions.users.first());
    if (!muser) muser = msg.member;
    if(!user) user = msg.author;
  const embed = new Discord.RichEmbed();
  embed.addField("Username", `${user.username}#${user.discriminator}`, true)
          .addField("ID", `${user.id}`, true)
          .setColor(3447003)
          .setThumbnail(`${user.avatarURL}`)
          .setTimestamp()
          .setURL(`${user.avatarURL}`)
          .addField('Currently', `${muser.presence.status.toUpperCase()}`, true)
          .addField('Game', `${muser.presence.game === null ? "No Game" : muser.presence.game.name}`, true)
          .addField('Joined Discord', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
          .addField('Joined Server', `${moment(muser.joinedAt).toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`, true)
          .addField('Roles', `${muser.roles.array()}`, true)
          .addField('Is Bot', `${user.bot.toString().toUpperCase()}`, true)
          .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      msg.channel.send({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["userstats"],
  permLevel: 0
};

exports.help = {
  name: 'userinfo',
  description: 'Displays information about a user.',
  usage: 'userinfo <@user>'
};
