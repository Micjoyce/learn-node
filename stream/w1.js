var fs = require('fs');
var content = 'hello world111';
var filepath = './sample.txt';

fs.writeFile(filepath, content, function(err, result) {
    console.log(err, result);
});