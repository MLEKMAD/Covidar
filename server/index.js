const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const parser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

app.use(express.static(__dirname + '/public'));

app.use(parser.json());


function getLocation(email){
  client.geopos('va-universities', email, function(err, result) {
    app.locals.location = result;
    
    });
}
function getNearUsers(req, res, next) {
  const { email } = req.params;
  console.log(email)
  
  getLocation(email);
   
  console.log('location',app.locals.location);
   client.georadius(
    'va-universities',
    app.locals.location[0][0],
    app.locals.location[0][1],
    '100',
    'mi',
    'WITHCOORD',
    'WITHDIST',
    'ASC',
    function(err, results) {
      if (err) {
        next(err);
      } else {
        results = results.map(function(aResult) {
          resultObject = {
            key: aResult[0],
            distance: aResult[1],
            longitude: aResult[2][0],
            latitude: aResult[2][1],
          };
          return resultObject;
        });

        res.send(results);
      }
    }
  );
}
function addUser(req, res, next){
    const {longitude, latitude} = req.params;
    
    client.geoadd(
      'users',
      longitude,
      latitude, function(req,result){
        console.log("user successfully added");
        res
        .status(204)
        .json({success:'User added '});
      }
    )
}

function CalculateState(req, res) {
  const { Answers } = req.body;
  var cofficients ={
    "Sore Throat" : 7,
    "Stuffy Nose" : 2
  };
  
  console.log(Answers);
  var score = 0;
  for (var key in Answers){
    score = score + cofficients[key] * Answers[key].value;
  }
    console.log(score);
    if (score>5){
      var threat = "High";
    }
    else if(score > 2 ){
      threat = "Medium"
    }
    else {
      threat = "Low";
    }
  return(threat);
  
}

app.get('/users/:email', getNearUsers);
app.put('/user/:longtitude/:latitude', addUser);
app.post('/answers/',(req,res) => {
  console.log(CalculateState(req,res));
  var body = req.body;
  res.send(body);
  console.log("body",body)
})



app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});
