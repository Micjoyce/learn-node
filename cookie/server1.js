var http = require('http')
var Cookies = require('cookies')

var port = 3000

// Optionally define keys to sign cookie values
// to prevent client tampering
var keys = ['keyboard cat']

var server = http.createServer(function (req, res) {
  console.info(req.headers['cookie'])
  // Create a cookies object
  var cookies = new Cookies(req, res, { keys: keys })

  // Get a cookie
  var demo = cookies.get('demo', { signed: true })
  var subdemo = cookies.get('subdemo', { signed: true })
  var secdemo = cookies.get('secdemo', { signed: true })

  // Set the cookie to a value
  cookies.set('demo', new Date().toISOString(), { signed: true, domain: 'domain.com' })

  res.setHeader('Content-Type', 'text/plain')
  res.end(JSON.stringify({
    demo,
    subdemo,
    secdemo,
  }))
})

server.listen(port, function () {
  console.log(`Visit us at http://127.0.0.1:${port}/ !`)
})