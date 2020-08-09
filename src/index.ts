import { WorkerizeRedux, WorkerReducer, WorkerAction } from './workerizeRedux';

export { WorkerAction, WorkerPayloadAction } from './workerizeRedux';

export { applyWorker } from './applyWorker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createWorker = <T = any, A extends WorkerAction = WorkerAction>(
    reducer: WorkerReducer<T, A>
): WorkerizeRedux<T, A> => {
    const workerizeRedux = new WorkerizeRedux<T, A>();
    workerizeRedux.addWorkerReducer(reducer);
    return workerizeRedux;
};
