const settings = require('../settings.json');
exports.run = (client, message, args, customisation) => {
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("❌**Error:** I don't have the **Manage Roles** permission!");
    if (message.mentions.users.size === 0) return message.reply("❌Please mention a user to give the role to.\nExample: `addrole @user Members`");
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply("❌**Error:** That user does not seem valid.");
    let rname = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.cache.find(val => val.name === rname);
    if (!role) return message.reply(`❌**Error:** ${rname} isn't a role on this server!`);
    let botRolePosition = message.guild.member(client.user).roles.highest.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because your role is lower than the specified role.")
    if (botRolePosition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
    member.roles.add(role).catch(e => {
        return message.channel.send(`❌**Error:**\n${e}`);
    });
    message.channel.send(`<a:balancecheck:556017659419033653> **${message.author.username}**, I've added the **${rname}** role to **${message.mentions.users.first().username}**.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["buff"],
  permLevel: 2
};

exports.help = {
  name: 'addrole',
  description: 'Adds a role. It\'s that simple.',
  usage: 'addrole [mention] [role name (don\'t mention the role)]',
  category: "Mod"
};
