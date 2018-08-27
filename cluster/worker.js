const http = require('http')

const app = http.createServer((req, res) => {
  res.end('hello world, I am worker')
  process.send({ cmd: 'notifyRequest' })
})

app.listen(8000, () => {
  console.log(`工作进程 ${process.pid} 已启动`)
})
