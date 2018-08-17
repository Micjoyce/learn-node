var log4js = require('log4js')

var logger = log4js.getLogger('seerline')

logger.level = 'debug'
logger.debug('hello world')
logger.info('This is logger info')