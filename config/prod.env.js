'use strict'
process = require('process');
module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL),
  OAUTH_CLIENT_ID: JSON.stringify(process.env.OAUTH_CLIENT_ID),
  OAUTH_CLIENT_SECRET: JSON.stringify(process.env.OAUTH_CLIENT_SECRET),
};
