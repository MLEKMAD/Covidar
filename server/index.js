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

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: true }))

// parse application/json
app.use(parser.json())


function getNearUsers(req, res, next) {
  const { id } = req.params;
 
  client.geopos('users', id, function(err, result) {
  
    app.locals.location = result;
    client.georadius(
      'users',
      app.locals.location[0][0],
      app.locals.location[0][1],
      '4000',
      'm',
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

function CalculateState(req, res) {
  const  Answers  = req.answers;
  var cofficients ={
    "Sore Throat" : 7,
    "Stuffy Nose" : 2
  };
  
  console.log("zjz",Answers);
  // console.log("keys",Object.getOwnPropertyNames(Answers));
  var score = 0;
  for (var key in Answers){
    score = score + Answers[key].value;
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
  app.locals.threat = threat;
  
}

function RegisterThreat(userId, threat){
  client.hmset("threat", [userId,threat], (err, reply) => {
    if(err) {
      console.error(err);
    } else {
      console.log("reply",reply);
    }
  });

}
//this function add patients that were too close to the user
function addPotentialPatients(req, res, next){
  let {id} = req.params;
  let potentialPatients = req.body //to verify
  potentialPatients.map(item => {
    client.sadd(id,item.key,(request,reply)=>{
      client.expire(id,1209600,(err,reply) => {
        if(err) {
          console.error(err);
        } else {
          console.log("reply",reply);
        }
      })
    })
  })
}
//this function get the user whose state is high and it sends the keys of 
function getPotentialPatients(req, res, next){
  client.keys("*",(err,reply)=>{//get all the keys
    reply.map(item=>{
      client.hget('threat',item,(err2,reply3)=>{//get the state 
        if(err){
          console.log("error")
        }else{
          if(reply3.localeCompare("High")==0){//if it's high get all the patients that the user contacted 
                client.smembers(item,(er,rep)=>{
                  if(er){
                    console.log(er);
                  }else{
                    res.send(rep);//send the keys of the patiens
                  }
                })
          }
        }
      })
    })
  })
}


app.get('/users/:id', getNearUsers);
app.put('/user/:longitude/:latitude/:member', addUser);
app.post('/answers/',(req,res) => {
  req = JSON.parse((Object.getOwnPropertyNames(req.body))[0])
  console.log(req)
  CalculateState(req,res);
  console.log("treat",app.locals.threat)
  RegisterThreat(req.userId,app.locals.threat);
  
})
app.get('/users/:id/state', (req,res) => {
      let {id}= req.params;
      console.log("im",id)
      client.hget("threat", id,(req,reply) => {
        console.log('u r ',reply)
        res.send(reply)
      });
    });
app.post('`/potential/:id',addPotentialPatients);
app.get('/notification/',getPotentialPatients);



app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});



