# delay

> Delay a promise a specified amount of time


## Install

```
$ npm install --save @gradecam/delay
```


## Usage

```ts
import delay from '@gradecam/delay';

delay(200)
	.then(() => {
		// Executed after 200 milliseconds
	});

delay(100, 'a result')
	.then(result => {
		// Executed after 100 milliseconds
		// result === 'a result';
	});
```


## Advanced usage

```ts
import { delay } from '@gradecam/delay';

// With Node.js >=7.6 and async functions
(async () => {
	bar();

	await delay.resolve(100);

	// Executed 100 milliseconds later
	baz();
})();

// There's also `delay.reject()` which optionally accepts a value and rejects it `ms` later
delay.reject(100, 'foo'))
	.then(x => blah()) // Never executed
	.catch(err => {
		// Executed 100 milliseconds later
		// err === 'foo'
	});

// You can cancel the promise by calling `.cancel()`
(async () => {
	try {
		const delayedPromise = delay(1000);
		setTimeout(() => {
			delayedPromise.cancel();
		}, 500);
		await delayedPromise;
	} catch (err) {
		// `err` is an instance of `delay.CancelError`
	}
})();
```


## API

### delay.resolve(ms, [value])

Create a promise which resolves after the specified `ms`. Optionally pass a
`value` to resolve. For convienience this method is also the default export.

### delay.reject(ms, [value])

Create a promise which rejects after the specified `ms`. Optionally pass a
`value` to reject.

#### ms

Type: `number`

Milliseconds to delay the promise.

#### value

Type: `any`

Value to resolve or reject in the returned promise.

### promise#clear([err])

Settle the promise prior to specified delay. If `err` is specified `reject` instead of settling normally.

#### err

Type: `Error`

Reason for cancelling the delay prematurely.


## Related
- [delay](https://github.com/sindresorhus/delay) - module upon which this is based
- [delay-cli](https://github.com/sindresorhus/delay-cli) - CLI for the original delay module
- [p-min-delay](https://github.com/sindresorhus/p-min-delay) - Delay a promise a minimum amount of time
- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [GradeCam](https://gradecam.com)
