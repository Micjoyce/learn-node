const cluster = require('cluster')

const numCpus = require('os').cpus().length

let workReq = []

function messageHandler (msg) {
  if (msg.cmd && msg.cmd === 'notifyRequest') {
    if (workReq[this.id] === undefined || workReq[this.id] === null) {
      workReq[this.id] = 0
    }
    workReq[this.id] += 1
  }
}

cluster.setupMaster({
  exec: './worker.js',
  args: ['--use', 'http'],
  silent: false
})

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  setInterval(() => {
    console.log(`workReq = ${workReq}`)
  }, 1000)

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
}
