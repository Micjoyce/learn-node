# Http

## body parse

http.req --> zlib.Unzip --> string   --> bodyparse --> body

stream   --> inflation  --> raw-body --> co-body   --> koa ctx.request.body

// attach listeners
stream.on('aborted', onAborted)
stream.on('close', cleanup)
stream.on('data', onData)
stream.on('end', onEnd)
stream.on('error', onEnd)
