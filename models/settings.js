const mongoose = require('mongoose')
settingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: String,
    channelignorestats: Boolean,
    channelignore: String,
});
module.exports = mongoose.model("Setting",settingSchema)
