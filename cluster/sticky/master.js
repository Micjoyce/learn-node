const net = require('net')
const cluster = require('cluster')
const numCpus = require('os').cpus().length

// 保存worker实例
const workers = new Map()

cluster.setupMaster({
  exec: './app_worker.js',
  args: [],
  silent: true // false输入worker的stderr和stdout
})

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 衍生工作进程
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  // fork成功
  cluster.on('fork', worker => {
    // 保存worker实例
    workers.set(worker.id, worker)
  })

  // 监听worker断开连接事件
  cluster.on('disconnect', worker => {
    console.log('[master] app_worker#%s:%s disconnect, suicide: %s, state: %s, current workers: %j',
      worker.id, worker.process.pid, worker.exitedAfterDisconnect, worker.state, Object.keys(cluster.workers));
  })
  // 监听worker推出事件
  cluster.on('exit', (workder, code, signal) => {
    console.log(`工作进程 ${workder.process.pid} 已退出, code ${code}, singal: ${signal}`)
    // 此处需要通知master重新fork一个新的进程，保证足够的启动进程
  })

  // 通过net监听3000端口的tcp连接，并随机将connection句柄分发给worker处理。
  // pauseOnConnect 被设置为 true,
  // 那么与连接相关的套接字都会暂停，也不会从套接字句柄读取数据
  // 这样就允许连接在进程之间传递，避免数据被最初的进程读取。
  // 如果想从一个暂停的套接字开始读数据，请调用connection.resume()
  net.createServer({ pauseOnConnect: true }, connection => {
    if (!connection.remoteAddress) {
      connection.close()
    } else {
      // 随机获取worker
      const worker = randomGetWorker()
      worker.send('sticky-session:connection', connection)
    }
  }).listen(3000)
}

// 从workers随机获取一个worker并返回
// 此处为负载均衡策略
// cluster的默认负载均衡策略为 round-robin https://en.wikipedia.org/wiki/Round-robin_scheduling
const randomGetWorker = () => {
  const ids = Array.from(workers.keys())
  const idx = Math.floor(Math.random() * ids.length)
  const id = ids[idx]
  return workers.get(id)
}
