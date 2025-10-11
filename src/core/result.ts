/**
 * makes a result from a function that can throw
 * @param fn a function that can throw
 * @returns a result with the return type of the function or the error thrown
 */
export function fromthrowable<T,fnType extends (...args: any[])=>T>(fn: fnType): Result<T, unknown>
/**
 * makes a result from a function that can throw with arguments
 * @param fn a function that can throw
 * @param args the arguments to pass to the function
 * @returns a result with the return type of the function or the error thrown
 */
export function fromthrowable<T,fnType extends (...args: any[])=>T>(fn: fnType, ...args:any[]): Result<T, unknown>
export function fromthrowable<T,fnType extends (...args: any[])=>T>(fn: fnType, ...args:any[]): Result<T, unknown>{
  // the fns args being so weirdly typed is just implimentation stuff
  try {
    return ok(fn(...args));
  } catch (e) {
    return err(e);
  }
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;

export function ok<T, E = never>(value: T): Ok<T, E>;
export function ok<T extends void = void, E = never>(value: void): Ok<void, E>;
export function ok<T, E = never>(value: T): Ok<T, E> {
  return new Ok(value);
}

export function err<T = never, E extends string = string>(err: E): Err<T, E>;
export function err<T = never, E = unknown>(err: E): Err<T, E>;
export function err<T = never, E extends void = void>(err: void): Err<T, void>;
export function err<T = never, E = unknown>(err: E): Err<T, E> {
  return new Err(err);
}

// reminder: typescript compiler adds any readonly arguments in the constructor to the object for you

interface _result<T, E> {
  isOk(): this is Ok<T, E>;
  isErr(): this is Err<T, E>;
  map<U>(fn: (value: T) => U): Result<U, E>;
  mapErr<U>(fn: (error: E) => U): Result<T, U>;
  unwrap(): T;
  unwrapErr(): E;
}

export class Ok<T, E> implements _result<T, E> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return new Ok(fn(this.value));
  }

  mapErr<U>(fn: (error: E) => U): Result<T, U> {
    // chaining or something i just stole this part from neverThrow
    return new Ok(this.value);
  }

  unwrap(): T {
    return this.value;
  }
  unwrapErr(): E {
    throw new Error("Cannot unwrapErr on Ok");
  }
}

export class Err<T, E> implements _result<T, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    // chaining or something i just stole this part from neverThrow
    return new Err(this.error);
  }

  mapErr<U>(fn: (error: E) => U): Result<T, U> {
    return new Err(fn(this.error));
  }

  unwrap(): T {
    throw new Error(`Cannot unwrap Err: ${this.error}`);
  }
  unwrapErr(): E {
    return this.error;
  }
}
