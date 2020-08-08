"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var ctx = self;
var ReduxWorker = /** @class */ (function () {
    function ReduxWorker() {
        var _this = this;
        this.reducerFn = function (state) { return state; };
        this.actionHandler = function (evt) {
            var _a = evt.data, state = _a.state, action = _a.action;
            if (action.worker && typeof action.type === 'string') {
                var payload = _this.reducerFn(state, action);
                ctx.postMessage({ worker: true, payload: payload });
            }
        };
        this.addReducer = function (reducerFn) {
            _this.reducerFn = reducerFn;
        };
        this.destroy = function () {
            ctx.removeEventListener('message', _this.actionHandler);
        };
        ctx.addEventListener('message', this.actionHandler);
    }
    return ReduxWorker;
}());
exports.ReduxWorker = ReduxWorker;
