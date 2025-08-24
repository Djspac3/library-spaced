/**
 * stolen wizardry that makes stuff readable ig?
 */
export type prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export namespace looseautocomplete {
  /**
   * just loose autocomplete for strings
   * @example
   * ```ts
   * type aiModels = "a" | "b" | "c" | (string & {})
   * //                                 ^ this is the important part that this is an alias for
   * // the (string & {}) part makes it so that autocomplete is loose
   * // meaning you can still type other strings but it will suggest the ones in the union
   *
   * // this basicly just makes ts THINK its not the same type thus not agressively remove stuff
   */
  export type LooseStrings = string & {};
}

/**
 * converts an object of objects into a union of objects with a type key
 * @example
 * ```ts
 * type actions = {
 *    login: { user: string; pass: string };
 *    logout: {reason: string};
 *    update: {id:string, data: any} }
 * type actiondiscoUnion = convertToDiscoUnion<actions>
 * // results in:
 * type result = {
 *    type: "login";
 *    user: string;
 *    pass: string;
 * } | {
 *    type: "logout";
 *    reason: string;
 * } | {
 *    type: "update";
 *    id: string;
 *    data: any;
 * }
 */
export type convertToDiscoUnion<T> = {
  [K in keyof T]: prettify<
    {
      type: K;
    } & T[K]
  >;
}[keyof T];
