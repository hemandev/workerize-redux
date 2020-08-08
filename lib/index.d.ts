import { Reducer } from 'redux';
import { ReduxWorker } from './reduxWorker';
export { applyWorkerMiddleWare } from './applyWorkerMiddleware';
export declare const createWorker: (reducer: Reducer<any, import("redux").AnyAction>) => ReduxWorker;
