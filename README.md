# JS-Discord-Bot
An Open Source version of Cryptonix X and a basic frame for any discord.js bot. Integrates MongoDB as a solution for database!
[Support Server](https://discord.gg/sjtcnRb)
## Updated for Discord.js V12 *woohoo*

Made by **HarutoHiroki#4000**

## Requirements
- Node.js Recommended 12.16.0 and up - https://nodejs.org/en/download/
- git - https://git-scm.com/download/
- Visual Studio Build tool - `npm install -g --production windows-build-tools`

## Optional tools
- PM2 - NodeJS Module

## How to setup
1. Make a bot [here](https://discordapp.com/developers/applications/me) and grab the token
![Image_Example1](https://i.imgur.com/61akydu.png)<br>
2. Fill in the required spots, such as token, prefix and change anything you like in **settings.json** and **customisation.json**.<br>
3. To install all needed node modules, do **npm install**<br>
4. Install [MongoDB Community Server](https://www.mongodb.com/download-center/community) for coins Database and settings. [Tutorial Here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)<br>
5. Start the bot by having the cmd/terminal inside the bot folder and type **node .**<br>
6. In setup you need to first do `[prefix]settings template` to get the template. Then you need to edit it and upload it to discord as an attachment with the command `[prefix]settings upload` (these settings are different from settings.json from Step 1<br>
7. Enjoy!

## Common "Errors"
`UnhandledPromiseRejectionWarning: SyntaxError: Unexpected token | in JSON at position 69420` - well to solve this compare the json file you're trying to upload to the [example.json](https://github.com/HarutoHiroki/Discord.js-Bot/blob/master/temp/example.json) file included in the code and see whats wrong there.

## (OPTIONAL) Keeping your bot online on a virtual private server
Want to start hosting your own bot? Well I have one recommended tool for youuuuuuuuuu :D

As mentioned in optional tools, PM2 is a useful tool that can help you keep your bot online and restart it whenever it crashes. To install it do
`npm i pm2` to install it for the repo only or do `npm i pm2 -g` to install it globally (need admin/sudo perms)

Then you can start the bot using PM2 by doing `pm2 start index.js` inside the bot folder. More documentation [here](https://pm2.keymetrics.io/)
