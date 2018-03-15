var express = require('express');
var leaderRouter = express.Router();
var bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());   

leaderRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the leaders to you!');
})

.post(function(req, res, next){
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});

leaderRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leaders: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.dishId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.dishId);
});

module.exports.leaderRouter = leaderRouter;