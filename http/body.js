const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = {
    parseBody: ctx.request.body,
    rawBody: ctx.request.rawBody,
  };
});


app.listen(3000);
console.log('listening on port http://127.0.0.1:3000');