import { Reducer } from 'redux';
export declare class ReduxWorker {
    reducerFn: Reducer;
    constructor();
    actionHandler: (evt: MessageEvent) => void;
    addReducer: (reducerFn: Reducer<any, import("redux").AnyAction>) => void;
    destroy: () => void;
}
