const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long
settingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: Long,

    prefix: String,

    chatbot: Boolean,

    channelignorestats: Boolean,
    channelignore: String,
    
});
module.exports = mongoose.model("Setting",settingSchema)
