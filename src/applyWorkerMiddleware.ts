import { AnyAction, Store, Dispatch } from 'redux';

let isFirstTime = true;

export const applyWorkerMiddleWare = (worker: Worker) => (store: Store) => (
    next: Dispatch
) => (action: AnyAction): AnyAction | undefined => {
    if (isFirstTime && worker instanceof Worker) {
        isFirstTime = false;
        worker.addEventListener('message', (evt) => {
            if (store.dispatch && evt.data.worker) {
                store.dispatch({
                    type: action.successActionType,
                    payload: evt.data.payload
                });
            }
        });
    }

    if (action.worker && action.successActionType) {
        worker.postMessage({ state: store.getState(), action });
    } else {
        return next(action);
    }
};
