const cluster = require('cluster')

const http = require('http')

const numCpus = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 衍生工作进程
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (workder, code, signal) => {
    console.log(`工作进程 ${workder.process.pid} 已退出, code ${code}, singal: ${signal}`)
  })
} else {
  http.createServer((req, res) => {
    res.end('hello world\n')
    throw new Error('sdfasf')
  }).listen(8000)

  console.log(`工作进程 ${process.pid} 已启动`)
}