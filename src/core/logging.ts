export default class logs {
  log(...data: any[]) {
    let first = data[0];

    console.warn(
      "%cDEBUG: %c",
      "color: blue",
      "color: white",
      ...data.slice(1)
    );
  }
  warn(...data: any[]) {
    let first = data[0];

    console.warn(
      "%cDEBUG WARN: %c",
      "color: blue",
      "color: white",
      ...data.slice(1)
    );
  }
  error(...data: any[]) {
    let first = data[0];

    console.error(
      "%cDEBUG ERROR: %c",
      "color: blue",
      "color: white",
      ...data.slice(1)
    );
  }

  dir(object: any) {
    // depth null = INFINITE DEPTH
    console.dir(object, { depth: null });
  }

  /**
   *
   * @param condition a boolean or undefined for if
   * @param data whats passed to console.error if condition is false or undefined
   */
  assert(condition?: boolean | undefined, ...data: any[]) {
    console.assert(condition, ...data);
  }
}
