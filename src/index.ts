import { Reducer } from 'redux';
import { ReduxWorker } from './reduxWorker';

export { applyWorkerMiddleWare } from './applyWorkerMiddleware';

export const createWorker = (reducer: Reducer): ReduxWorker => {
    const reduxWorker = new ReduxWorker();
    reduxWorker.addReducer(reducer);
    return reduxWorker;
};
