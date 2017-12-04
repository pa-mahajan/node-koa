/**
 * Application Runner
 */

'use strict'

/**
 * Set Appplication Configurations
 */
let config = require('./config/environment');

/**
 * Initialize Logger accross application
 */
let logger = require(config.shared.logger);
logger.init(config);

/**
 * Require Logger
 */
const l = logger.root.child({'module': __filename.substring(__dirname.length + 1, __filename.length -3)});

/**
 * Uncaught Exception Handler
 */
process.on('uncaughtException', ( err ) => {
    l.error(err, 'Uncaught Exception');
});

/**
 * Uncaught Rejection Hander
 */
process.on('uncaughtRejection', ( err ) => {
    l.error(err, ' Uncaught Rejection ');
})

/**
 * koa Configuration
 */
const koa = require('koa'),
app = new koa(),
co = require('co');

app.init = co.wrap(async () => {
    l.info('Initiating server on IP: %s at PORT: %d in  %s mode', config.ip, config.port, config.env);
    app.server = app.listen(config.port);
});

app.init();

