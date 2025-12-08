import { findElement } from "../utils/find-element";
import { useSessionStorage } from "../utils/storage";
import { makeEventListener } from "../utils/make-event-listener";

function getLocation(key: string) {
  return window.location[key as keyof Location] as string;
}

export function prepareBackAnchor() {
  const backAnchor = findElement<HTMLAnchorElement>("#back-anchor");
  const [prevPath, setPrevPath] = useSessionStorage("prev-path");
  const prev = prevPath();
  const curr = getLocation("pathname");

  if (!backAnchor || prev === curr) {
    setPrevPath("");
    return;
  }

  if (!prev) {
    setPrevPath(curr);
    return;
  }

  makeEventListener(backAnchor, "click", (e) => {
    e.preventDefault();
    window.history.back();
  });
}
