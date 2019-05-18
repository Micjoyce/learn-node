const { default: enforceHttps } = require('koa-sslify');
const Koa = require('koa');
const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const Router = require('koa-router');
const send = require('koa-send');
const { push } = require('./push')

class KoaOnHttps extends Koa {
  constructor() {
    super();
  }
  get options() {
    return {
      key: fs.readFileSync(require.resolve('./ssl/localhost-privkey.pem')),
      cert: fs.readFileSync(require.resolve('./ssl/localhost-cert.pem'))
    };
  }
  listen(...args) {
    const server = http2.createSecureServer(this.options, this.callback());
    return server.listen(...args);
  }
  redirect(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

const app = new KoaOnHttps();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'hello world'
});
router.get('/index.html', async (ctx, next) => {
  // 请求 index.html 的时候顺带把 js 推送下去
  if (ctx.path === '/index.html') {
    push(ctx.res.stream, '/bundle1.js', ctx)
    push(ctx.res.stream, '/bundle2.js', ctx)
  }
  await send(ctx, './public/index.html');
});

app.use(enforceHttps());

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(443, () => {
  console.log('app start at:', `https://you.keyin.cn`);
});

// receive all the http request, redirect them to https
app.redirect(80, () => {
  console.log('http redirect server start at', `http://you.keyin.me`);
});
