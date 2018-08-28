const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')

const app = new Koa()

const router = new Router()

router.get('/', async function (ctx, next) {
  console.log(process.id)
  ctx.body = 'hello world'
})

app.use(router.routes())
app.use(router.allowedMethods())

// app.listen(3000)

const server = http.createServer(app.callback())
// server.listen(0) 正常情况下，这种调用会导致server在随机端口上监听
// 但在cluster模式中，所有工作进程每次调用listen(0)时会收到相同的“随机”端口
// 如果要使用独立端口的话，应该根据工作进程的ID来生成端口号。
server.listen(0, '127.0.0.1')

process.on('message', (message, connection) => {
  if (message !== 'sticky-session:connection') {
    return
  }
  // 主动发送 connection 事件到 http server，建立tcp连接
  // http://nodejs.cn/api/http.html#http_event_connection
  server.emit('connection', connection)
  connection.resume()
})
