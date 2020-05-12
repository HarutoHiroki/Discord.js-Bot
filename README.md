# JS-Discord-Bot
An Open Source version of Cryptonix X and a basic frame for any discord.js bot. Integrates MongoDB as a solution for database!

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
![Image_Example1](https://i.imgur.com/61akydu.png)

2. Fill in the required spots, such as token, prefix and change anything you like in **config.json** and **customisation.json**.

3. To install all needed node modules, do **npm install**

4. Install [MongoDB Community Server](https://www.mongodb.com/download-center/community) for coins Database and settings.

5. Start the bot by having the cmd/terminal inside the bot folder and type **node .**

6. Enjoy!

## (OPTIONAL) Keeping your bot online on a virtual private server
Want to start hosting your own bot? Well I have one recommended tool for youuuuuuuuuu :D

As mentioned in optional tools, PM2 is a useful tool that can help you keep your bot online and restart it whenever it crashes. To install it do
`npm i pm2` to install it for the repo only or do `npm i pm2 -g` to install it globally (need admin/sudo perms)
