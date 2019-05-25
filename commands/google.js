const google = require('google'),
      Discord = require('discord.js');
      const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
    if (!args[0]) return message.channel.send("You must imput something for me to search!");
    google.resultsPerPage = 1;

    google(args.join("+"), function(err, res) {
        if (err) return message.reply(":no_entry_sign: **Error:** There was an issue googling that. Please try a different keyword.");

        let link = res.links[0];
        let googleThumbnail = 'https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg';
        let googleIcon = 'https://maxcdn.icons8.com/Share/icon/Logos//google_logo1600.png';

        const embed = new Discord.RichEmbed()
            .setColor(0xdb3236)
            .setAuthor(`Results for ${args.join(' ')}`, googleIcon)
            .setThumbnail(googleThumbnail)
            .addField(`**${link.title} - ${link.href}**`, link.description)
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

        message.channel.send({embed}).catch(e => {
           if (e) return message.channel.send("There was an error!\n" + e);
        });
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'google',
  description: 'Googles something.',
  usage: 'google <query>'
};
