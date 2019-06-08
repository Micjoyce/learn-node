const zlib = require('zlib')
const fs = require('fs')
const gzip = zlib.createGzip();

const inp = fs.createReadStream('demo1.js')
const out = fs.createWriteStream('demo.gz')

inp.pipe(gzip).pipe(out)