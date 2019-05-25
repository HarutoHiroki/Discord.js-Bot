exports.run = (client, message, args) => {
  if (!message.author.id === '242263403001937920') return message.reply('You do not have the permission to use this command!');
  if(!args[0]) return message.reply('Tell me a status boi.');
  if(args[0] === 'status') return message.reply('Come on boi. The statuses are Online, Idle, DND, and Offline.');
  args.join(" ");
  message.reply(`I am now \`${args}\`.`);
  client.user.setPresence({ status: `${args}` });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'setstatus',
  description: 'Sets the bot\'s status.',
  usage: 'setstatus <status>'
};
