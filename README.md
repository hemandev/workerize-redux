# workerize-redux

[![npm version]()]()
[![Build Status]()]()

workerize-redux is a simple middleware for redux applications which allows you to run specific tasks on
web workers. workerize-redux action creators of type

```js
{
    type: 'ACTION_NAME',
    worker: true,
    successActionType: 'SUCCESS_ACTION_NAME'
}
```

Unlike normal action creators, workerize-redux checks if it has two additional attributes `worker` and `successActionType`. Once the task in worker thread is complete, a new action of type `successActionType` will be dispatched with the result as action payload.

## Installing

Using npm:

```bash
$ npm install workerize-redux
```

## Example

### Worker thread

```js
//worker.ts
import { createWorker } from 'workerize-redux';
import { calculateSomethingComplex } from './calculate';

// The passed state will be whole state of the app.
const worker = createWorker((state, action) => {
    switch (action.type) {
        case 'WORKER_ACTION':
            const result = calculateSomethingComplex();
            return result;
    }
});
```

### Main thread

```js
//store.ts
import { createStore, applyMiddleware } from 'redux';
import { applyWorkerMiddleWare } from 'workerize-redux';

const worker = new Worker('./dist/worker.ts');
const store = createStore(reducer, preloadedState, applyMiddleware(worker));
```

```js
//main.ts

dispatch({
    type: 'WORKER_ACTION',
    worker: true,
    successActionType: 'WORKER_SUCCESS_ACTION',
    payload: someObj
});
```

```js
//reducer.ts
import { createStore, applyMiddleware } from 'redux';
import { applyWorkerMiddleWare } from 'workerize-redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'WORKER_SUCCESS_ACTION':
            return {...state, result: action.payload};
    }
});
```

### Instance methods

## TypeScript

workerize-redux includes [TypeScript](http://typescriptlang.org) definitions out of the box.
