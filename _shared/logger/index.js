'use strict';

const b = require('bunyan'),
  path = require('path');

/**
 * Overiding logger close function
 * @param {*} f 
 */
b.prototype.close = function (f) {
    if (!this._isSimpleChild) {
        this.streams.forEach(function (s) {
            if (s.closeOnExit) {
                console.log('closing stream s:', s);
                s.stream.end(f);
                s.closeOnExit = false;
            }
        });
    }
};

/**
 * Logger Exports Object
 */
let lm = module.exports = {};

/**
 * Logger Initiating function
 * @param {*} config 
 */
lm.init = (config) => {
    lm.root = b.createLogger({
        name: 'root',
        serializers: { // Logger Serializers
            err: b.stdSerializers.err,
            req: b.stdSerializers.req,
            res: b.stdSerializers.res,
            user: function (u) { if (u)
                return u._id; }
        },
        streams: [
            {
                level: config.log.level,
                stream: process.stdout
            },
            {
                type: 'rotating-file', 
                path: config.log.path, 
                count: 3, // Number of total files to be kept
                period: '1d', // Time period after which file should be changed
                level: config.log.level // logging  level
            }
        ]
    });
};
