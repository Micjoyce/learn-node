const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.use('*', async function (ctx, next) {
  process.send({ cmd: 'notifyRequest' })
  await next()
})

router.get('/', async function (ctx, next) {
  ctx.body = 'I am koa app' + ctx.ip
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000, () => {
  console.log('start listen 8000')
})
