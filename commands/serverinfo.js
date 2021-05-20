const Discord = require('discord.js');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
exports.run = (client, message, args, customisation) => {
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong"
    };
   // For Getting Current Number of Emotes in server
    var emojis;
    if (message.guild.emojis.cache.size === 0) {
        emojis = 'None';
    } else {
        emojis = message.guild.emojis.cache.size;
    }
   // Used to get Max emotes by Boost Tier Level ( counting in both animated AND static )
    var tierLvl = message.guild.premiumTier;
    var tierEmote = message.guild.premiumTier;
    if (tierLvl === 0) tierEmote = Number(tierLvl + 1);
    if (tierLvl > 1) tierEmote = Number(tierLvl  + 1);
    if (tierLvl > 2) tierEmote = Number(tierLvl  + 2);
    let maxEmotes = Number(tierEmote * 50 * 2);

    const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
  .setThumbnail(message.guild.iconURL())
  .setTimestamp()
  .addField("Created", `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`, true)
  .addField("ID", message.guild.id, true)
  .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
  .addField("Is developer's Server", (message.guild.ownerID === customisation.ownerid).toString().toUpperCase(), true)
  .addField("Region", region[message.guild.region], true)
  .addField("User Count", message.guild.memberCount, true)
  .addField("Member Count", message.guild.members.cache.filter(m => !m.user.bot).size, true)
  .addField("Bot Count", message.guild.members.cache.filter(m => m.user.bot).size, true)
  .addField("AFK Timeout", message.guild.afkTimeout / 60 + ' minutes', true)
  .addField("Roles", message.guild.roles.cache.size, true)
  .addField("Channels", message.guild.channels.cache.size, true)
  .addField("Emojis", `${emojis}/{Number(maxEmotes)};`, true)
  .addField("Verification Level", message.guild.verificationLevel, true)
  .setColor(Math.floor(Math.random()*16777215))
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  message.channel.send({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["serverstats"],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  category: "Useful",
  usage: 'serverinfo'
};
