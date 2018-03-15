var express = require('express');
var promoRouter = express.Router();
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var bodyParser = require('body-parser');
promoRouter.use(bodyParser.json());   

promoRouter.route('/')
.get(function (req, res, next) {
    Promotions.find({}, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.post(function (req, res, next) {
    Promotions.create(req.body, function (err, promo) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = promo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promoRouter.route('/:promoId')
.get(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.put(function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.delete(function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

promoRouter.route('/:promoId/comments')
.get(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        res.json(promo.comments);
    });
})

.post(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        promo.comments.push(req.body);
        promo.save(function (err, promo) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(promo);
        });
    });
})

.delete(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        for (var i = (promo.comments.length - 1); i >= 0; i--) {
            promo.comments.id(promo.comments[i]._id).remove();
        }
        promo.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

promoRouter.route('/:promoId/comments/:commentId')
.get(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        res.json(promo.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        promo.comments.id(req.params.commentId).remove();
        promo.comments.push(req.body);
        promo.save(function (err, promo) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(promo);
        });
    });
})

.delete(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        promo.comments.id(req.params.commentId).remove();
        promo.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports.promoRouter = promoRouter;