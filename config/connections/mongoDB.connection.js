/**
 * MongoDB Connection File
 */
'use strict'

const Mongoose = require('mongoose'),
    bluebird = require('bluebird'),
    config = require('./../environment'),
    l = require(config.shared.logger).root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

/**
 * Override Depricated promise
 */

Mongoose.Promise = bluebird;

/**
 * MongoDB Connect Function
 */
module.exports.connect = () => {

    l.info('Connecting to MongoDB');
    /**
     * Connect to MongoDB
    */
    Mongoose.connect(config.mongoDB.uri, config.mongoDB.options || {});

    /**
     * UnExpected Connection Close Error
    */
    Mongoose.connection.on('error', err => {
        l.error('MongoDB connection error: ', err);
        process.exit(-1);
    });

    l.info('MongoDB Connected');
}