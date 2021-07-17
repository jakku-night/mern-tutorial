const fs = require('fs');
const { promisify } = require('util');

fs = promisify(fs);

const file_sys = {};


module.exports = file_sys;