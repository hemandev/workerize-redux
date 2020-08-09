# workerize-redux

[![npm version](https://badge.fury.io/js/workerize-redux.svg)](https://badge.fury.io/js/workerize-redux)
[![Build Status](https://travis-ci.org/hemanditwiz/workerize-redux.svg?branch=master)](https://travis-ci.org/hemanditwiz/workerize-redux)

workerize-redux is a simple middleware for redux applications which allows you to run specific tasks on
web workers. `workerize-redux` accepts action creators of type

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
// Pass a reducer like function as argument to createWorker
// The difference here is the return value of the reducer will be sent as payload to the successAction
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
import { applyWorker } from 'workerize-redux';

const worker = new Worker('./dist/worker.ts');
const workerMiddleware = applyWorker(worker);
const store = createStore(reducer, preloadedState, applyMiddleware(workerMiddleware));
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
