const childProcess = require('child_process');
exports.run = (client, message, args, data, errors) => {
  if (message.author.id !== "242263403001937920") return message.channel.send('You scrub, what made you think you\'d be able to do that??');
    childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.sendCode('', err.message);
            message.channel.sendCode('', stdout);
        });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'exec',
  description: 'Executes a process command.',
  usage: 'exec'
};
