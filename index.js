/**
 * Application Boot File
 */

'use strict'

/**
 * Set Default Environment Variable accross platforms
 */
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Require Application Server Dependencies
 */
require('./app.js');