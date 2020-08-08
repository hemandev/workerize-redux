"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduxWorker_1 = require("./reduxWorker");
var applyWorkerMiddleware_1 = require("./applyWorkerMiddleware");
exports.applyWorkerMiddleWare = applyWorkerMiddleware_1.applyWorkerMiddleWare;
exports.createWorker = function (reducer) {
    var reduxWorker = new reduxWorker_1.ReduxWorker();
    reduxWorker.addReducer(reducer);
    return reduxWorker;
};
