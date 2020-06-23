const Discord  = require('discord.js');
const customisation = require('../customisation.json');

const agree    = "✅";
const disagree = "❎";

exports.run = async (bot, message, args) => {
  if(!args || args[0] === 'help') return message.reply("Usage: vote <question>")
  // Number.isInteger(itime)
  //  if (e) return message.reply('please supply a valid time number in seconds')
  let question = message.content.split(" ").splice(1).join(" ")
  if(question.length < 1){
    let msg = await message.channel.send(`Vote now! (Vote time: 2min)`);
    await msg.react(agree);
    await msg.react(disagree);

    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
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
                                            "----------------------------------------", true)

              .setColor("0x#FF0000")
              .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    await message.channel.send({embed: sumsum});
  }else if(question.length > 1){
    let msg = await message.channel.send(`Question: ${question} \nVote now! (Vote time: 2min)`);
    await msg.react(agree);
    await msg.react(disagree);
    
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
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
                                            "Question: " + question + "\n" +
                                            "Total votes (Yes): " + `${YES_Count-1}\n` +
                                            "Total votes (NO): " + `${NO_Count-1}\n` +
                                            "----------------------------------------", true)
  
              .setColor("0x#FF0000")
              .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    await message.channel.send({embed: sumsum});
  }
  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'vote',
    description: 'Vote for the message above.',
    usage: 'vote'
  };
  