import { err, ok, Result } from "./result";
import { awaitable, thenable } from "./helpers";

export class ResultAsync<T, E> implements thenable<Result<T, E>> {
  private _promise: Promise<Result<T, E>>;

  constructor(res: Promise<Result<T, E>>) {
    this._promise = res;
  }

  /**
   * takes a throwable promise and makes it into a resultAsync
   */
  static fromPromise<T, E>(promise: Promise<T>): ResultAsync<T, E> {
    const newPromise = promise
      .then((value: T) => ok<T, E>(value))
      .catch((e) => err<T, E>(e));
    return new ResultAsync(newPromise);
  }

  static fromThrowable<T>(fn: () => Promise<T>): ResultAsync<T, unknown> {
    return new ResultAsync(
      (async (...args) => {
        try {
          return ok<T, unknown>(await fn());
        } catch (error) {
          return err<T, unknown>(error);
        }
      })()
    );
  }

  then<U, F>(
    successCallback?: (res: Result<T, E>) => awaitable<U>,
    failureCallback?: (reason: unknown) => awaitable<F>
  ): PromiseLike<U | F> {
    return this._promise.then(successCallback, failureCallback);
  }

  map<U>(f: (t: T) => U | Promise<U>): ResultAsync<U, E> {
    return new ResultAsync(
      this._promise.then(async (res: Result<T, E>) => {
        if (res.isErr()) {
          return err<U, E>(res.error);
        }

        return ok<U, E>(await f(res.value));
      })
    );
  }

  mapErr<F>(f: (e: E) => F | Promise<F>): ResultAsync<T, F> {
    return new ResultAsync(
      this._promise.then(async (res: Result<T, E>) => {
        if (res.isOk()) {
          return ok<T, F>(res.value);
        }

        return err<T, F>(await f(res.error));
      })
    );
  }

  async unwrap() {
    const v = await this._promise;
    return v.isOk() ? v.value : v.error;
  }
}
