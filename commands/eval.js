function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, message, args, customisation) => {
    if (message.author.id !== customisation.ownerid) return message.channel.send('You scrub, what made you think you\'d be able to do that??');
    args = args.join(" ");
    try {
        var evaled = eval(args);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'eval',
  description: 'Evaluates a JS string.',
  category: "Owner",
  usage: 'eval'
};
