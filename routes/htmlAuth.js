var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); 

const {OAuth2Client} = require('google-auth-library');

router.post('/', async function(req, res, next) {
const credential = req.params.credential;
console.log('Credential',credential);
const cookies = req.cookies;
const token = cookies.g_csrf_token
console.log('Cookies',cookies);

console.log('Token',token)

    const client = new OAuth2Client(process.env.CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.SECRET_CLIENT_ID,  
     
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log("payload",payload);
  console.log("userid",userid)

}
await verify().catch(console.error);
res.send('testing 123')
});

module.exports = router;