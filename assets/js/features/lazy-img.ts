import { findElements } from "../utils/find-element";
import { getAttribute, getDataset, setDataset } from "../utils/attribute";
import { makeEventListener } from "../utils/make-event-listener";
import { noop } from "../utils/constant";
import { getMoriConfig } from "../features/configuration";

function blankImgData(width: number, height: number): string {
  return (
    `data:image/svg+xml,` +
    `%3Csvg xmlns='http://www.w3.org/2000/svg' ` +
    `width='${width}' height='${height}'/%3E`
  )
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
  const dataSrc = getDataset(img, "src");
  if (!dataSrc) return;
  setDataset(img, "status", "loading");
  const origTitle = img.title;
  img.title = "Loading...";
  img.src = dataSrc;
  const loaded = () => {
    setDataset(img, "status", "loaded");
    setDataset(img, "solved");
    img.title = origTitle;
  };

  let clearErrHandler = noop;
  let clearLoadHandler = noop;

  clearErrHandler = makeEventListener(img, "error", () => {
    clearErrHandler();
    clearLoadHandler();
    setDataset(img, "status", "error");
    setDataset(img, "solved");
    img.title = "Load failed";
    img.src = blankImgData(
      Number(getDataset(img, "guess-width") || getAttribute(img, "width")) ||
        512,
      Number(getDataset(img, "guess-height") || getAttribute(img, "height")) ||
        384
    );
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

export function prepareLazyImg() {
  findElements<HTMLImageElement>("img.lazy-img:not([data-solved])").forEach(
    (item) => {
      if (!getDataset(item, "src")) return;
      let w: string | number | null = getAttribute(item, "width");
      let h: string | number | null = getAttribute(item, "height");
      if (!w || !h) {
        const size = getMoriConfig().guessImgSize(item);
        w = size.width;
        h = size.height;
        setDataset(item, "guess-width", `${w}`);
        setDataset(item, "guess-height", `${h}`);
      }
      item.src = blankImgData(Number(w), Number(h));

      io.observe(item);
    }
  );
}
