require('dotenv').config()
const fs = require('fs')
const util = require('util')

const readDir = util.promisify(fs.readdir)

const config = require('config')
const fastify = require('fastify')()
const log = require('./lib/logger')

fastify.decorate('logger', log)
fastify.decorate('config', config)


async function run() {
	const routeFiles = await readDir(`${__dirname}/routes/`)
	const routes = routeFiles.map(fileName => `${__dirname}/routes/${fileName}`)
	routes.forEach(route => fastify.register(require(route)))
	await fastify.listen(config.server.port, config.server.host)
	log.info(`Service started on ${fastify.server.address().address}:${fastify.server.address().port}`)
}

run()
