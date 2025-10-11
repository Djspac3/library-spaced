import { expect, test } from "vitest";
import { cleanup, render as _render } from "@testing-library/preact";
import { JSDOM } from "jsdom";

function render(ui: preact.VNode) {
  const DOM = new JSDOM("<!DOCTYPE html><head></head><body></body>");
  // fix buggyness
  global.document = DOM.window.document;
  return _render(ui, {
    container: document.body,
  });
}

import { makeList, createElem } from "./components";
test("check makeList", () => {
  const items = [
    <span key="1">item 1</span>,
    <span key="2">item 2</span>,
    <span key="3">item 3</span>,
  ];
  const DOM = new JSDOM("<!DOCTYPE html><head></head><body></body>");
  global.document = DOM.window.document;
  render(makeList(items));
  console.dir(DOM.window.document.querySelector("ol")?.innerHTML);
});
test("check createElem", () => {
  const el = createElem("div", { className: "my-class" });
  expect(el.tagName).toBe("DIV");
  expect(el.className).toBe("my-class");
});
