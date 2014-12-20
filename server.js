#!/usr/bin/env node
var debug = require('debug')('node-test');
var app = require('./app');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('port', server_port);
server = app.listen(app.get('port'), server_ip_address,  function() { debug('Express server listening on port ' + server.address().port);});

