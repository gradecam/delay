/**
 * A delay promise adds a `clear` method to a standard promise.
 * If `clear` is called with a value `reject` the promise with
 * the specified value. Otherwise `resolve`/`reject` the promise
 * as if the `ms` had fully elapsed.
 */
export interface DelayPromise<T> extends Promise<T> {
    clear(err?: Error): void;
}

/**
 * Returns a delay function that will settle to a resolved or rejected value after
 * a specified delay.
 * @param willResolve determines whether `resolve` or `reject` will be used to settle
 */
const createDelay = (willResolve: boolean) =>
    <T = any>(ms: number = 0, value?: T): DelayPromise<T> => {
        let ref: any;
        let internalReject: Function;
        let settle: Function;
        const delayPromise = new Promise<T>((resolve, reject) => {
            internalReject = reject;
            settle = willResolve ? resolve : reject;
            ref = ms ?
                setTimeout(() => settle(value), ms) :
                setImmediate(() => settle(value))
            ;
        });
        (<any>delayPromise).clear = (err?: Error) => {
            if (!ref) { return; }
            ms ? clearTimeout(ref) : clearImmediate(ref);
            ref = null;
            err ? internalReject(err) : settle(value);
        };
        return <any>delayPromise;
    }
;

export const delay = {
    /**
     * Delay for `ms` then `reject` with `value`.
     */
    reject: createDelay(false),

    /**
     * Delay for `ms` then `resolve` with `value`.
     */
    resolve: createDelay(true),
};

export default delay.resolve;
