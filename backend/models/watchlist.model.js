const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WatchlistSchema = new Schema({
    email: {type: String, required: true},
    listname: {type: String, required: true},
    stocks: {type: Array, required: true}
}, {
    timestamps: true,
});

module.exports = Watchlist = mongoose.model("watchlists", WatchlistSchema);