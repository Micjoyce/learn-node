const net = require('net')
const server = net.createServer((c) => {
  // 'connection' listener
  console.log(getIp(c.remoteAddress), '----0000');
  console.log(c.remoteAddress)
  console.log('client connected')
  c.on('end', () => {
    console.log('client disconnected')
  })
  c.write('hello\r\n')
  c.pipe(c)
})
server.on('error', (err) => {
  throw err
})
server.listen(8124, () => {
  console.log('server bound')
})

function getIp (ip) {
  let s = ''
  for (let i = 0; i < ip.length; i++) {
    if (!isNaN(ip[i])) {
      s += ip[i]
    }
  }
  s = Number(s)
  const pid = s % 4
  return pid
}
