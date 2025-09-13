export default class logs {
  id: string;

  log(...data: any[]) {
    console.log(
      `%cDEBUG: ${this.id} : %c`,
      "color: blue",
      "color: white",
      ...data
    );
  }
  logID(id: string, ...data: any[]) {
    console.log(
      `%cDEBUG: ${this.id} : ${id} : %c`,
      "color: blue",
      "color: white",
      ...data
    );
  }

  warn(...data: any[]) {
    console.warn(
      `%cDEBUG WARN: ${this.id} : %c`,
      "color: yellow",
      "color: white",
      ...data
    );
  }
  warnID(id: string, ...data: any[]) {
    console.warn(
      `%cDEBUG WARN: ${this.id} : ${id} : %c`,
      "color: yellow",
      "color: white",
      ...data
    );
  }
  error(...data: any[]) {
    console.error(
      `%cDEBUG ERROR: ${this.id} : %c`,
      "color: red",
      "color: white",
      ...data
    );
  }
  errorID(id: string, ...data: any[]) {
    console.error(
      `%cDEBUG ERROR: ${this.id} : ${id} : %c`,
      "color: red",
      "color: white",
      ...data
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
    if (!condition) this.error(...data);
  }
  /**
   *
   * @param condition a boolean or undefined for if
   * @param data whats passed to console.error if condition is false or undefined
   */
  assertID(id: string, condition?: boolean | undefined, ...data: any[]) {
    if (!condition) this.errorID(id, ...data);
  }

  constructor(id: string) {
    this.id = id;
  }
}
