import { Reducer } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

export class ReduxWorker {
    public reducerFn: Reducer = (state) => state;

    constructor() {
        ctx.addEventListener('message', this.actionHandler);
    }

    actionHandler = (evt: MessageEvent): void => {
        const { state, action, successActionType } = evt.data;
        if (action.worker && typeof action.type === 'string') {
            const payload = this.reducerFn(state, action);
            ctx.postMessage({
                worker: true,
                successActionType,
                payload
            });
        }
    };

    addReducer = (reducerFn: Reducer): void => {
        this.reducerFn = reducerFn;
    };

    destroy = (): void => {
        ctx.removeEventListener('message', this.actionHandler);
    };
}
