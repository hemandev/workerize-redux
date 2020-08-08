import { AnyAction, Store, Dispatch } from 'redux';
export declare const applyWorkerMiddleWare: (worker: Worker) => (store: Store<any, AnyAction>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => AnyAction | undefined;
