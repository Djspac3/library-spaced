import type { convertToDiscoUnion } from "../core/helpers";

// small temporary alias to remove EVERYTHING
function rm(win: WindowProxy | Window) {
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
    url:string = "about:blank"
  ): WindowProxy {
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
      alert("Popup blocked! Please allow popups for this site.");
      throw new Error(
        "library: popup: promptPage: Popup blocked/failed to open"
      );
    }
    // if clearpage setting, clear page
    settings.html.clearPage && rm(popup);

    return popup;
  }
}

type promptSettings = {
  html: {
    width: number;
    height: number;
    clearPage: boolean;
    // if true, it will clear the page before scripts run
    globalScripts?: (
      popup: WindowProxy
    ) => void | ((popup: WindowProxy) => void)[];
  };
  list: {
    formating: "prompts";
    // prompts is just a load of prompts
    // TODO: add more formating options
  };
};

export var settings: promptSettings = {
  html: {
    width: 600,
    height: 600,
    clearPage: true,
  },
  list: {
    formating: "prompts",
  },
};

type EasyPromptFunctionConfig = convertToDiscoUnion<{
  html: {
    width?: number;
    height?: number;
    scripts?: (popup: WindowProxy) => void | ((popup: WindowProxy) => void)[];
  };
  list: {
    items: { label: string; value: string }[];
  };
  text: { prompt: string; default?: string };
}>;
/**
 * @param config config takes a "type" field which determines behavior
 * @returns nothing, but the popup will be closed when done
 */
export default function easyprompt(config: EasyPromptFunctionConfig) {
  // TODO: figureout how to make type checking work for switch case
  if (config.type === "html") {
    let page = popups.promptPage(config.width, config.height);
    // run scripts
    if (config.scripts) {
      if (!Array.isArray(config.scripts)) {
        // only one script
        config.scripts(page);
      } else {
        // multiple scripts
        config.scripts.forEach((script) => {
          script(page);
        });
      }
    }
    return page;
  } else if (config.type === "list") {
    switch (settings.list.formating) {
      case "prompts": {
        let output: string[] = [];
        config.items.forEach((item) => {
          let promptOutput = prompt(item.label, item.value) || "";
          output.push(promptOutput);
        });
        return output;
      }
      default: {
        throw new Error(
          "library: popup: easyprompt: Invalid config for list mode"
        );
      }
    }
  } else if (config.type === "text") {
    return prompt(config.prompt, config.default);
  } else {
    throw new Error("library: popup: easyprompt: Invalid config type");
  }
}
