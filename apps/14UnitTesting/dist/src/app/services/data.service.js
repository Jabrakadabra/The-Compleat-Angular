"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataService = (function () {
    function DataService() {
    }
    DataService.prototype.getDetails = function () {
        var resultPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('Now is the winter of our discontent');
            }, 0);
        });
        return resultPromise;
    };
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map