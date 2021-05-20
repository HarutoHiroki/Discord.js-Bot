const search = require('node-ddg').default;
const Discord = require('discord.js');
exports.run = async (client, message, args, customisation) => {
    if (!args[0]) return message.channel.send("You must imput something for me to search!");

    let options = {
      count: 0,
      offset: 0,
      lang: "en-US,en;q=0.9",
      debug: false,
      show: false,
      screenshot: false,
      wait: 0
    };
    let string = ''
    //search.duckduckgo(args.join("+"), options)
    search({ query: args.join("+"), maxResults: 3 })
    //.then(function(results){
      .then((results) => {
        for(let i = 0; i < 10; i++) {
          if(i > results.length - 1) {
              break;
          }

      string = string + `\n**${results[i].title}** \n${results[i].body} \n${results[i].url}`
        }
      //console.log(results)
      message.channel.send(string)
    })
    .catch((error) => { 
      message.channel.send("There was an error!\n" + error);
      return console.error('oups', error); 
    });    
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ddg','g'],
  permLevel: 0
};

exports.help = {
  name: 'duckduckgo',
  description: 'Searches something.',
  category: "Useful",
  usage: 'duckduckgo <query>'
};
