# Http

## body parse

http.req --> zlib.Unzip --> string   --> bodyparse --> body

stream   --> inflation  --> raw-body --> co-body   --> koa ctx.request.body
