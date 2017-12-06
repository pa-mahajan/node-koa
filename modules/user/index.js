/**
 * User Index File
 */
'use strict'

const userModel = require('./model'),
    userConfig = require('./user.config'),
    userController = require('./controller'),
    userService = require('./service'),
    Router = require('koa-router'),
    config = require('./../../config/environment'),
    l = require(config.shared.logger).root.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });

let m = module.exports = {};
/**
 * Initialize User Module Function
 * @param {*} params 
 */
m.init = (params) => {
    try {
        l.info('Initailizing User Module');
        if (userConfig.expose.api) {
            let userRouter = Router();
            let userApiParams = {
                router: userRouter
            };
            require('./api').init(userApiParams);
            params.router.use('/v1/user', userRouter.routes());
        }
        if (userConfig.expose.controller)
            m.controller = userController;
        if (userConfig.expose.service)
            m.service = userService;
        if (userConfig.expose.model)
            m.model = userModel;
        l.info('User Module Initialized');
    } catch (err) {
        throw (err);
    }
}