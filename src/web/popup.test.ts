import { expect, test, vi } from "vitest";
import { JSDOM } from "jsdom";

import { rm, popups, runOnceOnPage } from "./popup";
test("popups.promptPage", () => {});
test("popups.promptJson", () => {});
test("check rm correctly clears all elements of page", () => {
  //@ts-ignore
  const dom: Window = new JSDOM(
    `<!DOCTYPE html><head></head><body class='THIS SHOULDNT EXIST AFTER CLEAR'><div id="test">test</div></body><p>extra iframe bs would be here</p>`,
  ).window;
  rm(dom);
  expect(dom.document.documentElement.innerHTML).toBe(
    "<head></head><body></body>"
  );
});
test("check runOnceOnPage on mock popup", async () => {
  //@ts-ignore
  type _open = typeof open;
  // as unknown makes it let u use any type oddly
  global.open = vi.fn((url: string) => {
    return new JSDOM("", { url }).window as unknown as Window;
  }) as unknown as _open;
  expect(
    (
      await runOnceOnPage("about:blank", (win) => {
        return win.location.href;
      })
    ).unwrap()
  ).toBe("about:blank");
});
