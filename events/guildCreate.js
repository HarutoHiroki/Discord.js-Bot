const settings = require('../settings.json');
module.exports = guild => {
  let client = guild.client
  let channelID;
  let channels = guild.cache.channels;
  channelLoop:
  for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
          channelID = c[0];
          break channelLoop;
      }
  }

  let owner = guild.ownerID
  if(owner !== settings.ownerid){
    let channel = client.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(`Thanks for inviting me into this server! Please do /info and /help for the informations you need in order for the bot to work properly. Do /suggest or /bug if there's any suggestions or bug you found. THANKS`);

    client.guilds.forEach((guild) => {
const userData = require("../models/User.js");
  userData.findOne({
    userID: guild.ownerID,
  }, async (err, blacklist) => {
    if (blacklist === true){
        await channel.send("But UNFORTUNATELY, the owner of this server has been blacklisted before so I'm LEAVING! Bye!")
        guild.leave(guild.id)
        }
    })
});
}
}
