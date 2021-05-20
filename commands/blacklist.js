const mongoose = require('mongoose');
const Discord = require("discord.js");
const fs = require('fs');
exports.run = async (client, message, args, customisation) => {
  if (message.author.id !== customisation.ownerid) return message.reply("You don't have the permission to use this command...:facepalm:");
	if (!args[0]) return message.reply("Valid args are: [on/off] [user]");
		let bl = false;
		const user = message.mentions.members.first() || client.users.cache.get(args[1]);

		if(!user){
			return message.reply("Thats not a valid user! :facepalm:");
		}
		if(user.id === message.author.id){
			return message.reply("Congrats, You're blacklistedn't, lol.");
		}
		let status = args[0];
		if(!status || status !== "on" && status !== "off"){
 			return message.channel.send("what are you trying to set their blacklist status to? `on` or `off`? :facepalm:");
		};
		if (status === "on") bl = true;

	let userDataScheme = require('../models/User.js');
        userDataScheme.findOne({
          userID: user.id
        }, async(err, blacklist) => {
          if (err) console.error(err);
          if (!blacklist) {
              const newBlacklist = new userDataScheme({
                  _id: mongoose.Types.ObjectId(),
                  userID: user.id,
                  blacklist: bl,
              });
              newBlacklist.save()
                  .catch(err => console.error(err));
          }else{
		if(status === "on"){
              blacklist.blacklist = true;
              await blacklist.save()
                  .catch(err => console.error(err));
		message.reply("That user has been blacklisted.");
			return;
          	}else if(status === "off"){
				blacklist.blacklist = false;
				await blacklist.save();
				message.reply("That user has been unblacklisted.");
			}
		return;
}
})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
  };

exports.help = {
    name: 'blacklist',
    description: 'blacklist a user.',
    category: "Owner",
    usage: 'blacklist [userid]'
  };
