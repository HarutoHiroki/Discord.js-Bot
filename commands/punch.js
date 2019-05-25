exports.run = (client, message) => {
  var owner = "242263403001937920"
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to punch them.')
        if(user.id === owner){
          return message.reply("You can't hurt him you pleblord.");
  }else{
          message.reply('You have punched <@' + user.id + '>')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'punch',
  description: 'Punches a user.',
  usage: 'punch <user>'
};
