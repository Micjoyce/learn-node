var jwt = require('jsonwebtoken')

var secret = 'helloworld'
var token = jwt.sign({
  foo: 'bar',
}, secret, {
  expiresIn: 12
})


setTimeout(() => {
  jwt.verify(token, secret, function (err, result) {
    console.info(err, result)
  })
}, 1001)