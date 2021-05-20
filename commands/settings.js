const Discord = require('discord.js');
const https = require('https');
const fs = require('fs')
const mongoose = require('mongoose')

exports.run = async (client, message, args, customisation) => {
    //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌**Error:** You have to be an Admin to use this command!");
    if(!args) return message.reply("Usage: `settings current|example|template|upload (file upload)`")
    if(args[0] === 'template'){
        message.channel.send("Here's the settings template.", { files: ['./temp/default.json'] });
    }else if(args[0] === 'example'){
        message.channel.send("Here's the settings example.", { files: ['./temp/example.json'] });
    }else if(args[0] === 'upload'){
        if(!message.attachments.first() || message.attachments.first().name.split('.').pop() !== 'json'){
            return message.reply("Please attach a proper .json file")
        }else{

        const file = fs.createWriteStream(`./temp/${message.guild.id}.json`);
        const request = https.get(message.attachments.first().url, async function(response) {
            await response.pipe(file);
            file.on(`finish`, async function() {
                await file.close(console.log(`Done Downloading`));  // close() is async, call cb after close completes.
                let setting = JSON.parse(fs.readFileSync(`./temp/${message.guild.id}.json`, "utf8"))

                if(!setting['settings']){
                    message.reply('Please upload a proper settings file!')
                    return fs.unlinkSync(`./temp/${message.guild.id}.json`)
				}else{
                    if(!setting['settings'].prefix || setting['settings'].prefix.lenth > 21){
				    	message.reply('Please enter a prefix with a length between 1 and 20')
				    	return fs.unlinkSync(`./temp/${message.guild.id}.json`)
                    }

                    if(setting['settings'].channelignorestats == undefined){
                        message.reply('Please enter a proper channelignore status')
			    		return fs.unlinkSync(`./temp/${message.guild.id}.json`)
                    }else if(setting['settings'].channelignorestats !== true && setting['settings'].channelignorestats !== false){
                        message.reply('Please enter a proper channelignore status')
			    		return fs.unlinkSync(`./temp/${message.guild.id}.json`)
                    }else if(setting['settings'].channelignorestats == true){
                        let channeli = setting['settings'].channelignore.split(',')
                        channeli.forEach((id) => {
                            let channelid = message.guild.channels.cache.get(id);
                            if (!channelid){
                                message.reply('Please state a proper channel ID for channelignore')
                                return fs.unlinkSync(`./temp/${message.guild.id}.json`)
                            }
                        })
                    }
                }


                const Settings = require('../models/settings.js')
                Settings.findOne({
                    guildID: message.guild.id
                }, (err, settings) => {
                    if(!settings){
                        let cnid;

                        if(setting["settings"].channelignorestats == true){
                            cnid = setting["settings"].channelignore
                        }else{
                            cnid = 'none'
                        }

                        const newSettings = new Settings({
                            _id: mongoose.Types.ObjectId(),
                            guildID: message.guild.id,
                            prefix: setting['settings'].prefix,

                            channelignorestats: setting["settings"].channelignorestats,
                            channelignore: cnid,

                        })
                        newSettings.save()
                        fs.unlinkSync(`./temp/${message.guild.id}.json`)
                        return message.channel.send("Settings for this server have been updated!")
                    }else if(settings){
                        let cnid;

                        if(setting["settings"].channelignorestats == true){
                            cnid = setting["settings"].channelignore
                        }else{
                            cnid = 'none'
                        }

                        settings.prefix = setting['settings'].prefix,

                        settings.channelignorestats = setting["settings"].channelignorestats,
                        settings.channelignore = cnid,

                        settings.save()
                        fs.unlinkSync(`./temp/${message.guild.id}.json`)
                        return message.channel.send("Settings for this server have been updated!")
                    }
                })
            });
            }).on(`error`, async function(err) { // Handle errors
              await fs.unlinkSync(`./temp/${message.guild.id}.json`, function(err){
                  console.log(err)
              }); // Delete the file async. (But we don't check the result)
            });
        }
        
    }else if(args[0] === 'current'){
        const Settings = require('../models/settings.js')
        Settings.findOne({
            guildID: message.guild.id
        }, async (err, settings) => {
            if(!settings){
                return message.reply("This server hasn't been set up")
            }else{
                let dict = {
                    "settings":{
                        "prefix": settings.prefix,

                        "channelignorestats": settings.channelignorestats,
                        "channelignore": settings.channelignore
                    }
                }
                let dictstring = JSON.stringify(dict, null, 2);
                let fs = require('fs');
                await fs.writeFile("./temp/thing.json", dictstring, function(err, result) {
                    if(err) console.log('error', err);
                });

                const attachment = new Discord.Attachment("./temp/thing.json")
                await message.channel.send(attachment)
                fs.unlinkSync('./temp/thing.json')
            }
        })

    }else{
        return message.reply("Usage: `settings template|upload|current (file upload)`")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};
  exports.help = {
    name: 'settings',
    description: 'Full bot settings upload',
    category: "Mod",
    usage: 'settings template|upload (file upload)'
};
