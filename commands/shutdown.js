exports.run = (client, message, args) => {
  if (message.author.id !== "242263403001937920") return message.reply('You do not have the permission to use this command!');

  message.channel.send('Are you sure you want to shut me down?\n\nReply with \`cancel\` to **abort** the shutdown. The shutdown will self-abort in 30 seconds.');
  return message.channel.awaitMessages(m => m.author.id === message.author.id, {
    'errors': ['time'],
    'max': 1,
    time: 30000
  }).then(resp => {
    if (!resp) return;
    resp = resp.array()[0];
    let validAnswers = ['yes', 'y', 'no', 'n', 'cancel'];
    if (validAnswers.includes(resp.content)) {
      if (resp.content === 'cancel' || resp.content === 'no' || resp.content === 'n') {
        return message.channel.send('**Shutdown Aborted.**');
      } else if (resp.content === 'yes' || resp.content === 'y') {
        message.channel.send("Goodbye :wave:")
        client.destroy().then(() => { 
          process.exit();
        }).catch(console.error);
      }
    } else {
      message.channel.send(`Only \`${validAnswers.join('`, `')}\` are valid, please supply one of those.`).catch(()=>console.error);
    }
  }).catch(() => {
    console.error;
    message.channel.send('Shutdown timed out.');
  });
};

exports.conf = {
  enabled: true,  
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'shutdown',
  description: 'Shutdown the bot.',
  usage: 'shutdown'
};
