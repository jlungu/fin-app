const router = require('express').Router()
require("../../models/watchlist.model.js");
var Watchlist = require('mongoose').model('watchlists');

//GET all watchlists by email
router.route('/getAllWithEmail').get((req, res) => {
    Watchlist.find({email: req.query.email})
        .then(watchlists => res.json(watchlists))
        .catch(err => res.status(400).json('<ERROR> ' + err))
});

router.route('/').get((req, res) => {
    Watchlist.find()
        .then(watchlists => res.json(watchlists))
        .catch(err => res.status(400).json('<ERROR> ' + err))
});

//ADD new wacthlist. By default, when a user creates an account a default watchlist is created.
router.route('/add').post((req, res) => {
    const email = req.body.email
    const listname = req.body.listname
    const stocks = req.body.stocks

    const newWatchlist = new Watchlist({
        email,
        listname,
        stocks
    });

    newWatchlist.save()
    .then(() => res.json('Watchlist added'))
    .catch(err => res.status(400).json('<ERROR> ' + err))
});

//Handles add to/delete from list.
router.route('/update/:id').post((req, res) => {
    let wl = {};
    Watchlist.findById(req.params.id)
        .then(watchlist => {
            watchlist.email = req.body.email;
            watchlist.listname = req.body.listname;
            watchlist.stocks = req.body.stocks;

            watchlist.save()
                .then(() => res.json(watchlist))
                .catch(err => res.status(400).json('<ERROR> ' + err))
        })
})
//GET wacthlist
router.route('/:id').get((req, res) => {
    Watchlist.findById(req.params.id)
        .then(watchlist => res.json(watchlist))
        .catch(err => res.status(400).json("<ERROR> " + err))
})


//DELETE watchlist
router.route('/:id').delete((req, res) => {
    Watchlist.findByIdAndDelete(req.params.id)
        .then(() => res.json("Watchlist deleted."))
        .catch(err => res.status(400).json('<ERROR> ' + err))
})


module.exports = router;