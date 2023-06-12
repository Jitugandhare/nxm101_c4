const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    
})

const BlacklistModel = mongoose.model("blacklist", blacklistSchema);
module.exports = {
    BlacklistModel
}