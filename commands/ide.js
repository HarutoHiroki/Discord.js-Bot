const Discord = require('discord.js')

exports.run = (client, message, customisation) => {
  const embed = new Discord.MessageEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .addField('IDEs and Text Editors', 'There are many different ways to edit code, from code' +
                                     ' editors to Integrated Development Environments ("IDEs"). Here are some' +
                                     ' differences between the two and some examples of each:')
  .addField('IDEs:', 'IDEs (Integrated Development Environment) are programs that' +
  ' include a code editor, but also integrations with various other' +
  ' development tools (linters, version control,' +
  ' intellisense/autocomplete, automatic refactoring, database' +
  ' management, etc.).')
  .addField('Code Editors:', 'Code editors are text editors that usually include syntax' +
  ' highlighting, simple project management, and other helpful code' +
  ' editing tools.')
  .addField('WebStorm/PHPStorm (or any other JetBrains Product)','These IDEs, as they have a full suite of tools for' +
  ' development. Additionally they have a plugin system for anything' +
  ' that they do not automatically include. [Webstorm Download](https://www.jetbrains.com/webstorm/), [PHPStorm Download](https://www.jetbrains.com/phpstorm/)')
  .addField('Visual Studio','Visual studio is a full IDE made by microsoft. It works well' +
  ' with .NET based languages, as they are made by the same people.' +
  ' They also include a plugin system. [Download](https://visualstudio.microsoft.com/)')
  .addField('Atom','Atom is a code editor based on web technology. It\'s made by' +
  ' GitHub, and has a massive community, with plugins for everything. [Download](https://atom.io/)')
  .addField('VS Code','VS Code is another editor based off of web technology, but' +
  ' is better optimized and runs faster. This is built by microsoft' +
  ' and has a large set of plugins as well. [Download](https://code.visualstudio.com/)')
  .addField('Sublime Text','Sublime text starts off as a nice small and fast editor.' +
  ' It\'s the fastest text editor that I\'ve seen. There is also a' +
  ' wide selection of plugins. [Download](https://www.sublimetext.com/)')
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  message.channel.send({embed});
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'ide',
  description: 'IDEs and Text Editors',
  category: "Useful",
  usage: 'ide'
};
