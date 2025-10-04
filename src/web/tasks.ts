/**
 * reminder: use self/window .addEventListener("message",func)
 * to get data in the worker
 */
export class workerHelper {
  // the function used
  src: Function;
  worker: Worker;
  /**
   * creates a workerHelper from a function
   * @param func a function (note: this is using a bit of BLOB magic to make it into a uri to make a worker off, so a compiled function will be less memory intensive [probably])
   */
  constructor(func: Function) {
    this.src = func;
    this.worker = new Worker(
      // convert function to uri
      URL.createObjectURL(
        new Blob(
          // satanic magic to convert this function to blobPart
          [`(${func.toString()})()`],
          { type: "text/javascript" }
        )
      )
    );
  }

  postMessage(data: string) {
    this.worker.postMessage(data);
  }
  onmessage(callback: (this: Worker, ev: MessageEvent<any>) => any | void) {
    this.worker.addEventListener("message", callback);
  }

  private number(n: number) {
    let send: string;
    if (n.toExponential().length > n.toFixed().length) {
      send = n.toFixed();
    } else {
      send = n.toExponential();
    }
    return send;
  }

  sendData(data: string | number | object | Function | boolean) {
    switch (typeof data) {
      case "string":
        this.postMessage(data);
        break;
      case "number":
        this.postMessage(this.number(data));
        break;
      case "bigint":
        this.postMessage(this.number(data));
        break;
      case "object":
        this.postMessage(JSON.stringify(data));
        break;
      case "function":
        this.postMessage(data.toString());
        break;

      case "boolean":
        this.postMessage(data ? "true" : "false");
        break;
      default:
        throw new Error("unknown type: " + typeof data);
    }
  }
}
