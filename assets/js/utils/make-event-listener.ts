type Fn = () => void;
type MaybeArray<T> = T | T[];

// Helper to check if value is an array
function isArray<T>(value: MaybeArray<T>): value is T[] {
  return Array.isArray(value);
}

/**
 * Overload 1: Window target (omitted)
 */
export function makeEventListener<E extends keyof WindowEventMap>(
  event: MaybeArray<E>,
  listener: MaybeArray<(this: Window, ev: WindowEventMap[E]) => void>,
  options?: boolean | AddEventListenerOptions
): Fn;

/**
 * Overload 2: Explicit target (Window, Document, HTMLElement, or EventTarget)
 */
export function makeEventListener<E extends keyof HTMLElementEventMap>(
  target: EventTarget,
  event: MaybeArray<E>,
  listener: MaybeArray<(this: EventTarget, ev: HTMLElementEventMap[E]) => void>,
  options?: boolean | AddEventListenerOptions
): Fn;

// Implementation
export function makeEventListener(...args: any[]): Fn {
  let target: EventTarget;
  let events: string | string[];
  let listeners: EventListener | EventListener[];
  let options: boolean | AddEventListenerOptions | undefined;

  // Parse arguments based on overload
  if (typeof args[0] === "string" || isArray(args[0])) {
    // Overload 1: window target is omitted
    [events, listeners, options] = args;
    target = window;
  } else {
    // Overload 2: explicit target
    [target, events, listeners, options] = args;
  }

  // Normalize to arrays
  const eventArray = isArray(events) ? events : [events];
  const listenerArray = isArray(listeners) ? listeners : [listeners];

  // Register all event listeners
  const cleanups: Fn[] = [];
  for (const event of eventArray) {
    for (const listener of listenerArray) {
      target.addEventListener(event, listener, options);
      cleanups.push(() => target.removeEventListener(event, listener, options));
    }
  }

  // Return cleanup function
  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
