const router = require('express').Router()
const Watchlist = require('../models/watchlist.model');

router.route('/').get((req, res) => {
    Watchlist.find()
        .then(watchlists => res.json(watchlists))
        .catch(err => res.status(400).json('<ERROR> ' + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username
    const listname = req.body.listname
    const stocks = req.body.stocks

    const newWatchlist = new Watchlist({
        username,
        listname,
        stocks
    });
    newWatchlist.save()
    .then(() => res.json('Watchlist added'))
    .catch(err => res.status(400).json('<ERROR> ' + err))
});

router.route('/:id').get((req, res) => {
    Watchlist.findById(req.params.id)
        .then(watchlist => res.json(watchlist))
        .catch(err => res.status(400).json("<ERROR> " + err))
})
router.route('/:id').delete((req, res) => {
    Watchlist.findByIdAndDelete(req.params.id)
        .then(() => res.json('Watchlist deleted.'))
        .catch(err => res.status(400).json('<ERROR> ' + err))
})
router.route('/update/:id').post((req, res) => {
    Watchlist.findById(req.params.id)
        .then(watchlist => {
            watchlist.username = req.body.username;
            watchlist.listname = req.body.listname;
            watchlist.stocks = req.body.stocks;

            watchlist.save()
                .then(() => res.json('Watchlist updated'))
                .catch(err => res.status(400).json('<ERROR> ' + err))
        })
})

module.exports = router;