const admin = require('./admin.prod')();
const frontend = require('./frontend.prod')();

process.noDeprecation = true;
module.exports = [admin, frontend];
