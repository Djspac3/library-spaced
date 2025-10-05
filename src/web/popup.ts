import { err, ok, Result, ResultAsync } from "neverthrow";
import type { convertToDiscoUnion } from "../core/helpers";

// small temporary alias to remove EVERYTHING
export function rm(win: WindowProxy | Window) {
  win.document.documentElement.replaceChildren(
    win.document.head,
    win.document.body
  );
  Array.from(win.document.documentElement.attributes).forEach((at) => {
    win.document.documentElement.removeAttribute(at.name);
  });
  win.document.head.innerHTML = "";
  Array.from(win.document.head.attributes).forEach((at) => {
    win.document.head.removeAttribute(at.name);
  });
  win.document.body.innerHTML = "";
  Array.from(win.document.body.attributes).forEach((at) => {
    win.document.body.removeAttribute(at.name);
  });
}

export namespace popups {
  /**
   * @description Opens a popup window with the specified HTML content.
   * If the popup is blocked/failed, it alerts the user and throws an error.
   * @param {number?} width positive integer for popup width
   * @param {number?} height positive integer for popup height
   * @returns {WindowProxy?} popup window
   */
  export function promptPage(
    width: number = 600,
    height: number = 400,
    url: string = "about:blank",
    clearpage: boolean = true
  ): Result<WindowProxy, Error> {
    var popup = open(
      url,
      "",
      "popup=true,width=" +
        width +
        ",height=" +
        height +
        ",resizable=yes,scrollbars=yes"
    );
    if (!popup) {
      return err(new Error("Popup blocked/failed"));
    }
    // if clearpage setting, clear page
    clearpage && rm(popup);

    return ok(popup);
  }

  export function promptJson(
    promptMsg: string,
    defaultVal?: any
  ): Result<any, Error> {
    const result = prompt(
      promptMsg,
      defaultVal ? JSON.stringify(defaultVal) : undefined
    );
    if (!result) {
      return err(new Error("User cancelled prompt"));
    }
    try {
      const parsed = JSON.parse(result);
      return ok(parsed);
    } catch (e) {
      return err(new Error("Invalid JSON input"));
    }
  }
}

/**
 *
 * @param url the url to run a function on
 * @param func the function to run (on loading of page) (must take the window(Proxy) and return a promise of any value)
 * @returns the value func returns (as promise due to async nature) or the error caused on load
 */
export function runOnceOnPage<returntype>(
  url: string,
  func: (win: Window | WindowProxy) => Promise<returntype> | returntype
): ResultAsync<returntype, unknown> {
  return new ResultAsync(new Promise((resolve, reject) => {
    const page = popups.promptPage(100, 100, url).map((page) => {
      page.addEventListener("load", async () => {
        try {
          rm(page);
          resolve(ok(await func(page)));
          page.close();
        } catch (error) {
          reject(err(error));
        }
      });
    });
  }))
}
