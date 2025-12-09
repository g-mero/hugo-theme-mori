import { getDataset } from "../utils/attribute";

export type MoriConfiguration = {
  guessImgSize: (img: HTMLImageElement) => { width: number; height: number };
};

const moriConfig: MoriConfiguration = {
  guessImgSize: (img: HTMLImageElement) => {
    const url = getDataset(img, "src") || "";
    let width = 512;
    let height = 384;

    // Combined regex for width and height
    const matches = [...url.matchAll(/(\d{2,4})x(\d{2,4})/g)];
    const lastMatch = matches[matches.length - 1];
    if (lastMatch) {
      width = Number(lastMatch[1]) || 512;
      height = Number(lastMatch[2]) || 384;
    }

    return { width, height };
  },
};

export function getMoriConfig(): MoriConfiguration {
  return moriConfig;
}

export function setMoriConfig(config: MoriConfiguration): void {
  Object.assign(moriConfig, config);
}

//@ts-expect-error
window["setMoriConfig"] = setMoriConfig;
//@ts-expect-error
window["getMoriConfig"] = getMoriConfig;
