#!/usr/bin/env node
var debug = require('debug')('node-test');
var app = require('./app');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '192.168.0.7';

app.set('port', server_port);
server = app.listen(app.get('port'), server_ip_address,  function() { debug('Express server listening on port ' + server.address().port);});

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}

console.log(addresses);
