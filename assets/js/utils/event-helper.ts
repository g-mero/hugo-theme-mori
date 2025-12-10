/**
 * triggerCustomEvent - Simplified helper to dispatch CustomEvent
 *
 * Usage examples:
 * triggerCustomEvent('my-event', { foo: 'bar' });
 * triggerCustomEvent(window, 'my-event', { foo: 'bar' });
 */
export function triggerCustomEvent(type: string, detail?: any): void;
export function triggerCustomEvent(
  target: EventTarget,
  type: string,
  detail?: any
): void;
export function triggerCustomEvent(
  targetOrType: EventTarget | string,
  typeOrDetail: string | any,
  detail?: any
): void {
  let target: EventTarget;
  let type: string;

  if (typeof targetOrType === "string") {
    target = window;
    type = targetOrType;
    detail = typeOrDetail;
  } else {
    target = targetOrType;
    type = typeOrDetail as string;
  }

  const event = new CustomEvent(type, {
    detail,
    bubbles: true,
    cancelable: true,
  });

  target.dispatchEvent(event);
}
