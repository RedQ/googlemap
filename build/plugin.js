var fs = require('fs');
var directoryExists = require('directory-exists');
function reWebpackPlugin(options) {
  const isThere = directoryExists.sync('./resource');
  if (isThere === false) {
    fs.mkdirSync('./resource');
  }
}

reWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("done", function() {
    // console.log('folder created done!');
  });
};

module.exports = reWebpackPlugin;
