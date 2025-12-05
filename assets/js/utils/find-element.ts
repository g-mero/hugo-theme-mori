function callQueryFn(on: Document | Element, selector: string, all = false) {
  const method = `querySelector${all ? "All" : ""}` as
    | "querySelector"
    | "querySelectorAll";
  return on[method as "querySelector"](selector) as
    | Element
    | NodeListOf<Element>
    | null;
}

export function findElement<T extends Element = HTMLElement>(
  selector: string,
  parent: Document | Element = document
): T | null {
  return callQueryFn(parent, selector) as T | null;
}

export function findElements<T extends Element = HTMLElement>(
  selector: string,
  parent: Document | Element = document
): NodeListOf<T> {
  return callQueryFn(parent, selector, true) as NodeListOf<T>;
}
