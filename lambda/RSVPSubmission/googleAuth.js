const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const CLIENT_SECRET = 'client_secret.json'

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(callback) {
  console.log("authorizing...")
  console.log("Client Secret path: " + __dirname + "/" + CLIENT_SECRET)
  console.log("Client Secret exists: " + fs.existsSync(__dirname + "/" + CLIENT_SECRET))

  let content = fs.readFileSync(__dirname + "/" + CLIENT_SECRET)
  let clientSecret = JSON.parse(content)
  console.log(clientSecret);

  const {client_secret, client_id, redirect_uris} = clientSecret.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);


    // Check if we have previously stored a token.
  fs.readFile(__dirname + TOKEN_PATH, (err, token) => {
    console.log("reading client token...")
    if (err) return getNewToken(oAuth2Client, callback);

    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });

}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  console.log("could not find token, creating one...")
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(path){
  console.log("Listing files from: ", path);

  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
}

module.exports.authorize = authorize