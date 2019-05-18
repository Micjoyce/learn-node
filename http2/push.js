const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const {HTTP2_HEADER_PATH} = http2.constants;

const baseDir = './public';
const fileMap = new Map();

function getFileHeaders(path, fd) {
  const stat = fs.fstatSync(fd);
  const contentType = mime.getType(path);
  return {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': contentType
  };
}

exports.push = function(stream, filename, ctx) {
  const filePath = path.join(baseDir, filename);
  const fd = fs.openSync(filePath, 'r');
  const headers = getFileHeaders(filePath, fd)
  if (!headers) {
    console.error('Not found file')
    return
  }
  const pushHeaders = {[HTTP2_HEADER_PATH]: filename};
  stream.pushStream(pushHeaders, (err, pushStream) => {
    if (err) {
      console.error('server push error');
      throw err;
    }
    console.info('Server Push Resource:', filename);
    pushStream.respond(headers);
    const fileStream = fs.createReadStream(null, {fd: fd});
    fileStream.pipe(pushStream);
    pushStream.on('close', () => fileStream.destroy());
    pushStream.on('error', (err) => {
      console.error('-----------', err)
      fileStream.destroy()
    });
  });
};