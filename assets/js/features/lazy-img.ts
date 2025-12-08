import { findElements } from "../utils/find-element";
import {
  getAttribute,
  removeDataset,
  setAttribute,
  setDataset,
} from "../utils/attribute";
import { makeEventListener } from "../utils/make-event-listener";
import { noop } from "../utils/constant";

function blankImgData(width: number, height: number): string {
  const temporaryImage =
    `data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 ` +
    `viewBox=%270 0 ${width} ${height}%27%3E%3C/svg%3E`;
  return temporaryImage;
}

const io = new IntersectionObserver(
  (items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        const target = item.target as HTMLImageElement;
        loadImg(target);
        io.unobserve(target);
      }
    });
  },
  { rootMargin: "85px 0px" }
);

function loadImg(img: HTMLImageElement) {
  const dataSrc = img.dataset.src;
  if (!dataSrc) return;
  setDataset(img, "status", "loading");
  const origTitle = img.title;
  img.title = "Loading...";
  img.src = dataSrc;
  const loaded = () => {
    setDataset(img, "status", "loaded");
    removeDataset(img, "guess-width");
    removeDataset(img, "guess-height");
    img.title = origTitle;
  };

  let clearErrHandler = noop;
  let clearLoadHandler = noop;

  clearErrHandler = makeEventListener(img, "error", () => {
    clearErrHandler();
    clearLoadHandler();
    setDataset(img, "status", "error");
    img.title = "Load failed";
    console.log(img.width, img.height);

    img.src = blankImgData(img.width || 96, img.height || 48);
  });

  if (img.complete) {
    loaded();
  } else {
    clearLoadHandler = makeEventListener(img, "load", () => {
      loaded();
      clearLoadHandler();
    });
  }
}

function guessImgSize(url: string) {
  let width = "100%";
  let height = "256px";

  // Combined regex for width and height
  const widthMatch = url.match(/(?:width|w)=(\d+)|(\d{2,4})(?:x|_)\d{2,4}/);
  const heightMatch = url.match(/(?:height|h)=(\d+)|\d{2,4}(?:x|_)(\d{2,4})/);

  if (widthMatch) {
    width = `${widthMatch[1] || widthMatch[2]}px`;
  }
  if (heightMatch) {
    height = `${heightMatch[1] || heightMatch[2]}px`;
  }

  return { width, height };
}

export function prepareLazyImg() {
  findElements<HTMLImageElement>(
    'img.lazy-img:not([data-status="loaded"])'
  ).forEach((item) => {
    if (!item.src) return;
    const dataSrc = item.src;
    item.dataset.src = dataSrc;
    const w = getAttribute(item, "width");
    const h = getAttribute(item, "height");
    if (!w || !h) {
      const size = guessImgSize(dataSrc);
      setDataset(item, "guess-width", size.width);
      setDataset(item, "guess-height", size.height);
    }
    item.src = blankImgData(Number(w || 1), Number(h || 1));

    io.observe(item);
  });
}
