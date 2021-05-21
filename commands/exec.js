const childProcess = require('child_process');
exports.run = (client, message, args, customisation, data, errors) => {
  if (message.author.id !== customisation.ownerid) return message.channel.send('You scrub, what made you think you\'d be able to do that??');
    childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.send('```' + err.message + '```');
            message.channel.send('```' + stdout + '```');
        });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'exec',
  description: 'Executes a process command.',
  category: "Owner",
  usage: 'exec'
};
