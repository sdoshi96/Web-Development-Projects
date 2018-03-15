var express = require('express');
var leaderRouter = express.Router();
var mongoose = require('mongoose');

var Leaders = require('../models/leaders');
var Verify = require('./verify');

var bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());   

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.find({}, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})


.post(Verify.verifyAdmin, function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId/comments')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader.comments);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        leader.comments.push(req.body);
        leader.save(function (err, leader) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(leader);
        });
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        for (var i = (leader.comments.length - 1); i >= 0; i--) {
            leader.comments.id(leader.comments[i]._id).remove();
        }
        leader.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

leaderRouter.route('/:leaderId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        leader.comments.id(req.params.commentId).remove();
        leader.comments.push(req.body);
        leader.save(function (err, leader) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(leader);
        });
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        leader.comments.id(req.params.commentId).remove();
        leader.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports.leaderRouter = leaderRouter;