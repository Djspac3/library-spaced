import {ts} from "../index"
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
  ): WindowProxy | null {
    var popup = open(
      "about:blank",
      "",
      "popup=true,width=" +
        width +
        ",height=" +
        height +
        ",resizable=yes,scrollbars=yes",
    );
    if (!popup) {
      alert("Popup blocked! Please allow popups for this site.");
      throw new Error(
        "library: popup: promptPage: Popup blocked/failed to open",
      );
    }

    // basicly sudo rm -rf popup.document
    popup!.document.documentElement.replaceChildren(
      popup!.document.head,
      popup!.document.body,
    );
    Array.from(popup!.document.documentElement.attributes).forEach((at) => {
      popup!.document.documentElement.removeAttribute(at.name);
    });
    popup!.document.head.innerHTML = "";
    Array.from(popup!.document.head.attributes).forEach((at) => {
      popup!.document.head.removeAttribute(at.name);
    });
    popup!.document.body.innerHTML = "";
    Array.from(popup!.document.body.attributes).forEach((at) => {
      popup!.document.body.removeAttribute(at.name);
    });

    return popup;
  }

  

  type EasyPromptconfig = ts.utils.convertToDiscoUnion<{
    html: {
      width?: number;
      height?: number;
      scripts?: (popup: WindowProxy) => void | ((popup: WindowProxy) => void)[];
    };
  }>;

  export function easyprompt(config: EasyPromptconfig) {}
}
