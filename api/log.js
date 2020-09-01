import { configure, getLogger } from 'log4js'

export default function(req, res) {
  configure({
    appenders: {
      logstash: {
        type: '@log4js-node/logstashudp', // UDP "driver"
        host: 'localhost', // for demo only; use value from env instead
        port: 5000 // for demo only; use value from env instead
      }
    },
    categories: {
      default: { appenders: ['logstash'], level: 'info' }
    }
  })
  const logger = getLogger()
  req.on('data', data => {
    const { level, message } = JSON.parse(data)
    switch (level) {
      case 'warn':
        return logger.warn(message)
      case 'info':
        return logger.info(message)
      case 'error':
        return logger.error(message)
    }
  })

  res.end()
}
