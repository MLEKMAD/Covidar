const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const parser = require('body-parser');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

function getNearUsers(req, res, next) {
  const { email } = req.params;

  client.geopos('va-universities', email, function(err, result) {
    app.locals.location = result;
  });

  //    console.log('location',app.locals.location);

  client.georadius(
    'users',
    app.locals.location[0][0],
    app.locals.location[0][1],
    '4',
    'km',
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

app.get('/:email', getNearUsers);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});