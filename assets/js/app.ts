import { prepareBackAnchor } from "./features/back-anchor";
import {
  initializeTheme,
  prepareThemeSwitcher,
} from "./features/theme-switcher";
import { makeEventListener } from "./utils/make-event-listener";

makeEventListener("DOMContentLoaded", () => {
  prepareBackAnchor();

  // theme switcher
  initializeTheme();
  prepareThemeSwitcher();
});
