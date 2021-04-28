const mongoose = require('mongoose')
userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    blacklist: Number,
});
module.exports = mongoose.model("User",userSchema)
