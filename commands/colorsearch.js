const Discord = require('discord.js');
const AlexAPI = require('alexflipnote.js')
const settings = require('../settings.json');
const AlexClient = new AlexAPI(settings.apitoken);

exports.run = async (client, message, args, customisation) => {
  if(!args[0] || args[0] === 'help') return message.reply("Please provide a valid hex code without the #")
  var isOk = /^[0-9A-F]{6}$/i.test(args[0])
  if (isOk === false) return message.reply("Please provide a valid hex code without the #")
  
  let body = await AlexClient.others.color(args[0])
  
  const embed = new Discord.MessageEmbed()
  .setColor("#ff9900")
  .setTitle(body.name)
  .setDescription("Hex: " + body.hex + '\n' + "RGB: " + body.rgb)
  .setImage(body.image)
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
    name: 'colorsearch',
    description: 'Search a color',
    category: "Useful",
    usage: 'colorsearch (hexcode)'
  };
   
