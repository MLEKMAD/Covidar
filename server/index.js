const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



 function getNearUsers(req, res, next) {
  const { id } = req.params;
 
  client.geopos('users', id, function(err, result) {
  
    app.locals.location = result;
    client.georadius(
      'users',
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
    });
  
}
function addUser(req, res, next){
    const {longitude, latitude, member} = req.params;
    
    client.geoadd(
      'users',
      longitude,
      latitude,
      member, function(requ,result){
        console.log("user successfully added");
        
        res
        .status(204)
        .json({success:'User added '});
      }
    )
    
}


app.get('/users/:id', getNearUsers);
app.put('/user/:longitude/:latitude/:member', addUser);
app.post('/answers/',(req,res) => {
  console.log("body",req.body)
})


app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});
