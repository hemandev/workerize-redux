"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFirstTime = true;
exports.applyWorkerMiddleWare = function (worker) { return function (store) { return function (next) { return function (action) {
    if (isFirstTime && worker instanceof Worker) {
        isFirstTime = false;
        worker.addEventListener('message', function (evt) {
            if (store.dispatch && evt.data.worker) {
                store.dispatch({
                    type: action.successActionType,
                    payload: evt.data.payload
                });
            }
        });
    }
    if (action.worker && action.successActionType) {
        worker.postMessage({ state: store.getState(), action: action });
    }
    else {
        return next(action);
    }
}; }; }; };
