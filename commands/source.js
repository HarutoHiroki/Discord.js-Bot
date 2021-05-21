const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../data/customisation.json');

exports.run = async (client, message, args) => {
   const { body } = await superagent
  .get(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)

  const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Here's My Source Code (partialy)")
    .setThumbnail("https://avatars2.githubusercontent.com/u/47408169?s=460&u=0643a773f66c55aaef978193ddca276b44635be1&v=4")
    .setDescription(`- Discord.js-Bot: [click](https://github.com/HarutoHiroki/Discord.js-Bot)\n- Dev's Github: [here](https://github.com/HarutoHiroki)\n- Sponsor me: https://www.patreon.com/harutohiroki`)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send({embed});

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'source',
    description: 'Bot\'s Source Code',
    category: "Useful",
    usage: 'source'
  };
