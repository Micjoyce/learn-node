
process.on('SIGHUP', () => {
    console.log(process.uptime())
    console.log('Got SIGHUP singal')
})

setTimeout(function() {
    console.log('Exiting')
})

console.log('hello');

process.kill(process.pid, 'SIGHUP')

console.log('world');

console.log(process.memoryUsage());

