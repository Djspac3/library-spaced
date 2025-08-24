import * as preact from "preact";

/**
 *
 * @param items items to make into a list (the type is just an element!)
 * @param ordered if to use ol or ul default true: ol
 * @returns a list of each item
 */
export function makeList(items, ordered = true) {
  const mapped = items.map((el, idx) => (
    //@ts-expect-error due to anoying tsx
    <li key={idx}>{el}</li>
  ));
  if (ordered) {
    return <ol>{mapped}</ol>;
  } else {
    return <ul>{mapped}</ul>;
  }
}
