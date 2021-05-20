const urban = require('urban');
const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
        if (args.length < 1) {
            return message.channel.send('Please enter a word');
        }
        let word = args.join(' ');

        urban(word).first(json => {
            if (!json) {
                return message.channel.send('No such word exist!');
            }
            let newstr = json.definition.match(/(.|[\r\n]){1,2040}/g);
            if (newstr.length >= 2){
                const def = new Discord.MessageEmbed()
                .setTitle(json.word)
                .setDescription(newstr[0] + '...')
                .addField('Upvotes', json.thumbs_up, true)
                .addField('Downvotes', json.thumbs_down, true)
                .setTimestamp(new Date())
                .setFooter(`Written by ${json.author}`);

            message.channel.send(def);
            }else{
            const def = new Discord.MessageEmbed()
                .setTitle(json.word)
                .setDescription(json.definition)
                .addField('Upvotes', json.thumbs_up, true)
                .addField('Downvotes', json.thumbs_down, true)
                .setTimestamp(new Date())
                .setFooter(`Written by ${json.author}`);

            message.channel.send(def);
            }
        });
    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'urban',
    description: 'Search urban dictionary',
    category: "Useful",
    usage: 'urban <word>'
  };
