"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = 'https://www.zipcodeapi.com/rest/<api_key>/multi-info.json/<zip_code>/<units>';
var http = require('http');
var api_key = 'f1YvFlaLgkB2GP1hHmXSHELbanl0dzasA9Yfu91KuCNbrOs9bq2S4N3fapfoYqQz';
var LocationService = (function () {
    function LocationService() {
    }
    LocationService.prototype.GetLocation = function () {
        var options = {
            host: 'example.com',
            port: 80,
            path: '/foo.html'
        };
        http.get(options, function (resp) {
            resp.on('data', function (chunk) {
                // do something with chunk
            });
        }).on('error', function (e) {
            console.log("Got Error: " + e.message);
        });
    };
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map