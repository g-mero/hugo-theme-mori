import { prepareBackAnchor } from "./features/back-anchor";
import {
  initializeTheme,
  prepareThemeSwitcher,
} from "./features/theme-switcher";
import { prepareLazyImg } from "./features/lazy-img";
import { makeEventListener } from "./utils/make-event-listener";

makeEventListener("DOMContentLoaded", () => {
  prepareBackAnchor();

  // theme switcher
  initializeTheme();
  prepareThemeSwitcher();

  prepareLazyImg();
});
