'use strict'

const path = require('path'),
  _ = require('lodash');

/**
 * Environment Independent Configurations
 */
const all = {
  /**
  * Current environment variable
  */
  env: process.env.NODE_ENV,

  /**
  * Application Root Folder
  */
  root: path.normalize(__dirname + './../../../'),

  /**
  * Application Port
  * Default - 3000
  */
  port: process.env.PORT || 3000,

  /**
  * Application IP
  * Default - 127.0.0.1
  */
  ip: process.env.IP || '127.0.0.1',

  /**
  * Utilities
  */
  shared: {
    logger: path.join(__dirname, './../../_shared/logger')
  },

  /**
  * Logs Configuration
  */
  log:{
    path: path.join(__dirname, './../../logs', process.env.NODE_ENV, 'project-name.' + process.env.NODE_ENV + '.log')
  }
}

/**
 * Export Configurations 
 * Merge configurations with environment configurations
 */
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});