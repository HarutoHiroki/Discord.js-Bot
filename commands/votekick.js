const Discord  = require('discord.js');
const customisation = require('../customisation.json');

const agree    = "✅";
const disagree = "❎";

exports.run = async (bot, message, args) => {

  if (message.mentions.users.size === 0){
    return message.reply(":x: " + "| Please Mention A User To Kick!");
  }

  let kickmember = message.guild.member(message.mentions.users.first());
  if(!kickmember){
    message.reply(":x: " + "| That User Does Not Seem Valid!");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.reply(":x: " + "| I need the \"KICK_MEMBERS\" permission!").catch(console.error);
  }

  let msg = await message.channel.send(`Vote to kick ${message.mentions.users.first().username}${message.mentions.users.first().discriminator}(50 Seconds)`);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  msg.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.MessageEmbed()
  
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          "Total votes (Yes): " + `${YES_Count-1}\n` +
                                          "Total votes (NO): " + `${NO_Count-1}\n` +
                                          "----------------------------------------\n" +
                                          "NOTE: Votes needed to kick (3+)\n" +
                                          "----------------------------------------", true)

            .setColor("0x#FF0000")
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  await message.channel.send({embed: sumsum});

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
    })
  }else{

    message.channel.send("\n" + "SAFE..... FOR NOW");
  }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'votekick',
    description: 'Vote to kick someone.',
    usage: 'votekick'
  };
  