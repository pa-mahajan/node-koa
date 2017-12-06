/**
 * Connections File Handler
 */
'use strict'

const config = require('./../environment');

module.exports = () => {
    /**
     * Possible Connections
     */
    const connections = [
        'mongoDB'
    ];
    for(let i=0; i< connections.length; i++){
        if(config[connections[i]].connect){
            require('./' + connections[i] + '.connection').connect();
        }
    }
}