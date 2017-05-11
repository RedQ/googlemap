const admin = require('./admin.dev')();
const frontend = require('./frontend.dev')();

process.noDeprecation = true;
module.exports = [admin, frontend];
