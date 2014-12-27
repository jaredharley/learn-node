var http = require("http");
var assert = require("assert");

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}

var opts = {
    host: '127.0.0.1',
    port: 8888,
    path: '/send',
    method: 'POST',
    headers: {'content-type':'application/x-www-form-urlencoded'}
};


for (var i = 10; i < 20; i ++) {
    var req = http.request(opts, function(response) {
        response.setEncoding('utf8');
        var data = "";
        response.on('data', function(d) {
            data += d;
        });
        
        response.on('end', function() {
            assert.strictEqual(data, '{"status":"ok","message":"Toot smelled"}');
        });
    });
    req.write('toot=' + randomString(i));
    req.end();
}