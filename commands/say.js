exports.run = (client, message) => {
    let args = message.content.split(" ").slice(1);
    message.delete();
    if (message.content.includes("@everyone") || message.content.includes("@here") || message.mentions.everyone) return message.channel.send("You ain't making me Ping anyone BOI!");
    message.channel.send(args.join(" ")).cleanContent;
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message.",
    category: "Useful",
    usage: "say [message]"
};
