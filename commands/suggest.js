exports.run = (client, message, args, customisation) => {
    if (!args[0]) return message.reply('You need to imput a Suggestion BOI');;
    if (args[0] === "bug") return message.reply("Please give a suggestion.");
    args = args.join(" ");
    message.reply("Thanks for suggesting something!");
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) suggested:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get(customisation.suggestionchannelid).send(`${content}`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'suggest',
  description: 'Suggests something.',
  category: "Useful",
  usage: 'suggest <suggestion>'
};
