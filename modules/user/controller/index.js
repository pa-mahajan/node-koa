/**
 * User Controller
 */
'use strict'

let userService = require('./../service');

/**
 * Get User Controller
 */
exports.get = async () => {
    try{
        return await userService.get();
    } catch(err){
        throw(err);
    }
}

/**
 * Create User Controller
 */
exports.create = async (params) => {
    try{
        let newUserParams = {
            user: params.user
        };
        return await userService.create(params);
    } catch(err){
        throw(err);
    }
}

/**
 * Update User Controller
 */
exports.update = async (params) => {
    try{
        let updateUserParams = {
            update: {
                $set: params.user
            },
            // id: params.id,
            options: {
                runValidators: true
            }
        };
        return await userService.findByIdAndUpdate(updateUserParams);
    } catch(err){
        throw(err);
    }
}