import { AnyAction } from 'redux';

export interface WorkerAction extends AnyAction {
    worker: true;
    successActionType: string;
}

export interface WorkerPayloadAction<T> extends WorkerAction {
    payload: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WorkerReducer<S = any, A extends WorkerAction = WorkerAction> = (
    state: S | undefined,
    action: A
) => unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

export class WorkerizeRedux<
    S = unknown,
    A extends WorkerAction = WorkerAction
> {
    public reducerFn: WorkerReducer<S, A> = (state) => state;

    constructor() {
        ctx.addEventListener('message', this.actionHandler);
    }

    actionHandler = async (evt: MessageEvent): Promise<void> => {
        const { state, action, successActionType } = evt.data;
        if (action.worker && typeof action.type === 'string') {
            const payload = await this.reducerFn(state, action);
            ctx.postMessage({
                worker: true,
                successActionType,
                payload
            });
        }
    };

    addWorkerReducer = (reducerFn: WorkerReducer<S, A>): void => {
        this.reducerFn = reducerFn;
    };

    destroy = (): void => {
        ctx.removeEventListener('message', this.actionHandler);
    };
}
