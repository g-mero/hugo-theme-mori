function callAttributeMethod<T extends "get" | "set" | "remove">(
  element: HTMLElement,
  method: T,
  ...args: any[]
): T extends "get" ? string | null : T extends "set" ? void : void {
  const methodName = `${method}Attribute` as
    | "getAttribute"
    | "setAttribute"
    | "removeAttribute";
  return element[methodName](...(args as [any, any])) as any;
}

export function getAttribute(
  element: HTMLElement,
  name: string
): string | null {
  return callAttributeMethod(element, "get", name);
}

export function setAttribute(
  element: HTMLElement,
  name: string,
  value: string
): void {
  callAttributeMethod(element, "set", name, value);
}

export function removeAttribute(element: HTMLElement, name: string): void {
  callAttributeMethod(element, "remove", name);
}

export function getDataset(element: HTMLElement, key: string): string | null {
  return getAttribute(element, `data-${key}`);
}

export function setDataset(
  element: HTMLElement,
  key: string,
  value?: string
): void {
  setAttribute(element, `data-${key}`, value ?? "");
}

export function removeDataset(element: HTMLElement, key: string): void {
  removeAttribute(element, `data-${key}`);
}
