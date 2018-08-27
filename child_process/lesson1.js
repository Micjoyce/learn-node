const child_process = require('child_process')

const data = child_process.execSync('echo "The \\$HOME variable is $HOME"');

console.log(data.toString());