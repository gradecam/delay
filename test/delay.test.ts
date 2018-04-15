import { assert } from 'chai';
import * as timeSpan from 'time-span';
import { delay } from '../src';

// tslint:disable
const inRange = require('in-range');
const getCurrentlyUnhandled = require('currently-unhandled')();
// tslint:enable
// tslint:disable:only-arrow-functions

describe('delay.resolve', () => {
    it('returns a resolved promise', async function() {
        const end = timeSpan();
        await delay.resolve(50);
        // t.true(inRange(end(), 30, 70), 'is delayed');
        assert.isTrue(inRange(end(), 30, 70), 'is delayed');
    });

    it('able to resolve a falsie value', async function() {
        assert.strictEqual(
            await delay.resolve(50, 0),
            0
        );
    });

    it('delay defaults to 0 ms', async function() {
        const end = timeSpan();
        await delay.resolve();
        assert.isTrue(end() < 5);
    });

});

describe('delay.reject', ()=> {
    it('returns a rejected promise', async function() {
        const end = timeSpan();
        try {
            await delay.reject(50, new Error('foo'));
            assert.isTrue(false, 'should have thrown');
        } catch (err) {
            assert.equal(err.message, 'foo', 'promise is rejected with the second argument');
            assert.isTrue(inRange(end(), 30, 70), 'is delayed');
        }
    });
    it('able to reject a falsie value', async function() {
        try {
            await delay.reject(50, false);
        } catch (err) {
            assert.isFalse(err);
        }
    });
    it('reject will cause an unhandledRejection if not caught', async function() {
        const reason = new Error('foo');
        let promise = delay.reject(0, reason);

        await delay.resolve(10);

        assert.deepEqual(getCurrentlyUnhandled(), [{
            reason,
            promise
        }], 'Promise should be unhandled');

        promise.catch(() => {});
        await delay.resolve(10);

        assert.deepEqual(getCurrentlyUnhandled(), [], 'no unhandled rejections now');
    });
});

describe('promise.clear', () => {
    it('will resolve', async function() {
        const delayPromise = delay.resolve(10000, true);
        delayPromise.clear();
        assert.isTrue(await delayPromise);
    });

    it('will reject appropriately', async function() {
        const reasons = [0, false, null, undefined, new Error('cancelled'), 'string rejection', true, {some: 'object'}];
        for (const reason of reasons) {
            const delayPromise = delay.resolve(10000, 'resolved');
            delayPromise.clear(reason);
            try {
                await delayPromise;
                if (typeof reason !== 'undefined') {
                    assert.isTrue(false, 'should have rejected');
                }
            } catch (rejectReason) {
                assert.strictEqual(rejectReason, reason);
            }
        }
    });
});
