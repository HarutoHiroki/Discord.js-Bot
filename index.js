const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const mongoose = require('mongoose')

require('./util/eventLoader')(client);
const util = require('util');
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Command Loaded! ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

//command reload
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

mongoose.connect(settings.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true   }, err => {
    if (err) return console.error(err);
    console.log(chalk.bgGreen.black('Connected to MongoDB database!'));
});

//client command elevation(permLevel)
client.elevation = message => {
  if (message.channel.type === 'dm') return;
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 3;
  if (message.member.id === message.guild.ownerID) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};

var log_file_err=fs.createWriteStream(__dirname + '/error.log',{flags:'a'});  

process.on('uncaughtException', function(err) {
console.log('Caught exception: ' + err);
log_file_err.write(util.format('Caught exception: '+err) + '\n');
});

client.login(settings.token);
