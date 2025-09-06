import * as preact from "preact";

/**
 * a helper function
 * @param items the list of preact elements to wrap in a list
 * @param ordered whether to make an ordered list (ol) or unordered list (ul)
 * @returns a ordered list (ol) or unordered list (ul) containing the items
 */
export function makeList(
  items: preact.JSX.Element[],
  ordered = true
): preact.VNode {
  const children = items.map((el, idx) => preact.h("li", { key: idx }, el));
  return ordered
    ? preact.h("ol", null, children)
    : preact.h("ul", null, children);
}

/**
 * a small idiotic script to quickely make html objects (note: NORMAL dom not (p)react)
 * @param tag
 * @param properties
 * @param parent
 * @returns
 */
export function createElem<ELNAME extends keyof HTMLElementTagNameMap>(
  tag: ELNAME,
  properties?: Partial<HTMLElementTagNameMap[ELNAME]>,
  parent?: HTMLElement
): HTMLElementTagNameMap[ELNAME] {
  var obj = document.createElement(tag);
  Object.assign(obj, properties);
  parent?.appendChild(obj);
  return obj;
}
