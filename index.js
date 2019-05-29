const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = 8080;

var checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-jmqsb6c5.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:8080',
  issuer: 'https://dev-jmqsb6c5.eu.auth0.com/',
  algorithms: ['RS256']
});

app.use(cors());

app.get('/', checkJwt, (req, res) => {
    console.log(req.user);
    res.send({ hello: 'world' })
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));