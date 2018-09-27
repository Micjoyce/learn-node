const http = require('http')
let count = 0
const app = http.createServer((req, res) => {
  count += 1
  if (count > 2) {
    throw new Error('error')
  }
  res.end('hello world')
})
app.listen(3000, () => {
  console.log('start')
})

process.on('uncaughtException', (err) => {
  app.on('request', function (req, res) {
    // Let http server set `Connection: close` header, and close the current request socket.
    req.shouldKeepAlive = false;
    res.shouldKeepAlive = false;
    if (!res._header) {
      res.setHeader('Connection', 'close');
    }
  });
  app.close();
  console.log('uncaughtException')
  console.log(process.pid)
  setTimeout(() => {
    console.log('exit');
    process.exit(1)
  }, 5000)
})
