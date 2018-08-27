const { spawn } = require('child_process')

const ls = spawn('ls', ['-lh', '../'])

ls.stdout.on('data', data => {
  console.log(`output ${data}`);
})

ls.stderr.on('data', data => {
  console.log(`error: ${data}`);
})

ls.on('close', code => {
  console.log(`close: ${code}`);
})