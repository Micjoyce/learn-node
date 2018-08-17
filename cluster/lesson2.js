const cluster = require('cluster')

const http = require('http')

const numCpus = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  let workReq = []

  setInterval(() => {
    console.log(`workReq = ${workReq}`);
  }, 1000)

  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      if (workReq[this.id] === undefined || workReq[this.id] === null) {
        workReq[this.id] = 0
      }
      workReq[this.id] += 1
    }
  }

  // 衍生工作进程
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (workder, code, signal) => {
    console.log(`工作进程 ${workder.process.pid} 已退出, code ${code}, singal: ${signal}`)
  })

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler)
  }
} else {
  http.createServer((req, res) => {
    res.end('hello world\n')
    process.send({ cmd: 'notifyRequest' })
  }).listen(8000)

  console.log(`工作进程 ${process.pid} 已启动`)
}

// 通过wrk -t12 -c400 -d30s http://127.0.0.1:8000
// 测试是否能自动负载均衡到不同的子进程中执行