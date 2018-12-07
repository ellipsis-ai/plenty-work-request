/*
@exportId L37t9FR9TmykN2WjDOuOfQ
*/
module.exports = (function() {
const { JWT } = require('google-auth-library');

return function(ellipsis) {
  return new JWT({
    email: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/drive'],
    subject: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  });
};

})()
     