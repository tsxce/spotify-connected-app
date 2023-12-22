const { config } = require('dotenv')
const path = require('path')

const envPath = path.resolve(__dirname, '../.env')
config({ path: envPath })

const express = require('express');
const request = require('request');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const querystring = require('querystring');
const app = express();

const port = process.env.BACKENDPORT || 3000;
const callbackUrl = `http://localhost:${port}/api/callback`;

const spotify_client_id =  process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret =  process.env.SPOTIFY_CLIENT_SECRET
var stateKey = 'spotify_auth_state';

app.use(cors());
app.use(cookieParser());

const generateRandomString = function (length) {
    var text = '';
    var possible = process.env.RANDOM_STRING || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/api/login', async (req, res) => {
    console.log("login")
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = "streaming \
    user-read-email \
    user-read-private \
    user-top-read \
    user-follow-read \
    user-read-recently-played\
    playlist-read-private"

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: callbackUrl,
        state: state
    })
    res.redirect(302, 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/api/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
    console.log(req.query)
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: callbackUrl,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('http://localhost:5173/login?token_spotify=' + access_token)
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });

app.listen(port, () => console.log(`Server is running on port ${port}`));