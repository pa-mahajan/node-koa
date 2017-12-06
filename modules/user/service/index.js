/**
 * User Service File
 */
'use strict'

let Mongoose = require('mongoose'),
    User = Mongoose.model('User');

/**
 * Get User Service
 * @param {} params 
 */
exports.get = async (params = {}) => {
    try {
        return await User.find(params.filter || {}).select(params.select || '');
    } catch (err) {
        throw (err);
    }
} 

/**
 * Create New User Service
 */
exports.create = async (params) => {
    try{
        return await new User(params.user).save();
    } catch(err){
        throw(err);
    }
}

/**
 * Update User Service
 */
exports.findByIdAndUpdate = async (params) => {
    try{
        return await User.findByIdAndUpdate(params.id , params.update , params.options || {});
    } catch(err) {
        throw(err);
    }
}