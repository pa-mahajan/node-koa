/**
 * User API Controller
 */
'use strict'

const userController = require('./../controller'),
    config = require('./../../../config/environment'),
    l = require(config.shared.logger).root.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });
/**
 * Get User API Controller
 */
exports.get = async (ctx, next) => {
    try {
        l.info('Request to get all users');
        let users = await userController.get();
        l.info('Users Found');
        ctx.status = 200;
        ctx.body = {
            users: users
        };
    } catch (err) {
        throw (err);
    }
}

/**
 * Create User API Controller
 */
exports.create = async (ctx, next) => {
    try {
        let userReq = await ctx.request.fields;
        if (!userReq)
            ctx.throw('Invalid Request', 400);

        let newUserParams = {
            user: userReq
        };
        l.info('Request to create user with details: %o', newUserParams);
        let newUser = await userController.create(newUserParams);
        if (!newUser)
            ctx.throw('Internal Server Error', 500);
        l.info('New User Created: %o', newUser);
        ctx.status = 201;
        ctx.body = {
            _id: newUser._id
        }
    } catch (err) {
        throw (err);
    }
}

/**
 * Update User API Controller
 */
exports.update = async (ctx, next) => {
    try{
        let userReq = ctx.request.fields;
        let id = ctx.params.id;
        if(!userReq)
            ctx.throw('Invalid Request', 400);
        let updateUserParams = {
            user: userReq,
            id: id
        };
        l.info('Request to update user with details ', updateUserParams);
        await userController.update(updateUserParams);
        ctx.status = 200;
    } catch(err){
        throw(err);
    }
}