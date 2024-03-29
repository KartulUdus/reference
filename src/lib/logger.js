const winston = require('winston')
const config = require('config')
const path = require('path')

const debugLog = new winston.transports.File({
	filename: path.join(__dirname, '../../logs/debugLog.json'),
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		winston.format.errors({ stack: true }),
	),
	maxsize: config.logger.logSize * 1000000,
	tailable: true,
	handleExceptions: true,
	maxFiles: 1,
	level: 'debug',
})

const errorLog = new winston.transports.File({
	filename: path.join(__dirname, '../../logs/errorLog.json'),
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		winston.format.errors({ stack: true }),
	),
	maxsize: config.logger.logSize * 1000000,
	tailable: true,
	handleExceptions: true,
	maxFiles: 1,
	level: 'warn',
})

const consoleLog = new (winston.transports.Console)({
	level: config.logger.level,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple(),
		winston.format.errors({ stack: true }),
	),
	handleExceptions: true,
})

module.exports =	winston.createLogger({
	transports: [
		consoleLog,
		errorLog,
		debugLog,
	],
})
