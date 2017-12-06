/**
 * User Model File
 */
'use strict'

let Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

let userSchema = new Schema({

    name: {
        first: {
            type: String,
            required: true
        }, last: {
            type: String,
            required: true
        }
    }, contactInfo: {
        email: {
            type: String,
            unique: true
        }, phoneNumber: {
            type: String,
            unique: true
        }
    }, password: {
        type: String
    }
});

Mongoose.model('User', userSchema);