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
const l = logger.root.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });

/**
 * Uncaught Exception Handler
 */
process.on('uncaughtException', (err) => {
    l.error(err, 'Uncaught Exception');
});

/**
 * Uncaught Rejection Hander
 */
process.on('uncaughtRejection', (err) => {
    l.error(err, ' Uncaught Rejection ');
})

/**
 * Initailize Connections
 */
require('./config/connections')();

/**
 * koa Configuration
 */
const koa = require('koa'),
    app = new koa(),
    co = require('co'),
    router = require('koa-router'),
    fs = require('fs'),
    path = require('path');

/**
 * Initialize Application Function
 */
app.init = co.wrap(async () => {
    l.info('Initializing Application');
    let appRouter = new router(app);
    let params = {
        router: appRouter
    }
    initialize_application_modules(params);
    app.use(appRouter.routes());
    l.info('Initiating server on IP: %s at PORT: %d in  %s mode', config.ip, config.port, config.env);
    app.server = app.listen(config.port);
});

/**
 * Initialize Modules Function
 * @param {*} params 
 */
let initialize_application_modules = (params) => {
    l.info('Initializing Modules');
    let modules = fs.readdirSync(path.join(__dirname, './modules'));
    for(let i=0; i<modules.length; i++){
        require(path.join(__dirname, './modules', modules[i])).init(params);
    }
    l.info('Modules Initialized');
}

app.init();


