const mongoose = require('mongoose')

const Schema = mongoose.Schema

const watchlistSchema = new Schema({
    username: {type: String, required: true},
    listname: {type: String, required: true},
    stocks: {type: Array, required: true}
}, {
    timestamps: true,
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema)

module.exports = Watchlist;