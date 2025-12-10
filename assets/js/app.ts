import { prepareBackAnchor } from "./features/back-anchor";
import {
  initializeTheme,
  prepareThemeSwitcher,
} from "./features/theme-switcher";
import { prepareLazyImg } from "./features/lazy-img";
import { makeEventListener } from "./utils/make-event-listener";

// should be called immediately to avoid flash when theme is dark
initializeTheme();

makeEventListener("DOMContentLoaded", () => {
  prepareBackAnchor();
  prepareThemeSwitcher();
  prepareLazyImg();
});
