const mongoose = require('mongoose')
userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    hasVoted: Boolean,
    blacklist: Number,
});
module.exports = mongoose.model("User",userSchema)
