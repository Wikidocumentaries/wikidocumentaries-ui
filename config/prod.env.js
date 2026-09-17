'use strict'
process = require('process');
module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL)
};
