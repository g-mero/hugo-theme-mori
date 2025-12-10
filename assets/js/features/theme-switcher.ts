import { findElement } from "../utils/find-element";
import { useLocalStorage } from "../utils/storage";
import { makeEventListener } from "../utils/make-event-listener";
import { triggerCustomEvent } from "../utils/event-helper";

const [storage, setStorage] = useLocalStorage("theme", "light");

// Check if View Transition API is supported
function supportsViewTransition() {
  return (
    "startViewTransition" in document &&
    typeof (document as any).startViewTransition === "function"
  );
}

// Change theme with optional animation
function changeTheme(
  theme: "dark" | "light",
  animate = false,
  x?: number,
  y?: number
) {
  const isDark = theme === "dark";

  // Animate theme change with View Transition API
  if (
    animate &&
    supportsViewTransition() &&
    x !== undefined &&
    y !== undefined
  ) {
    const transition = (document as any).startViewTransition(() => {
      document.documentElement.classList.toggle("dark", isDark);
    });

    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );
      const clipPath = [
        `circle(0% at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ];

      // Animate from full circle to zero for dark mode, reverse for light mode
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 350,
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
          easing: "ease-in-out",
          fill: "both",
        }
      );
    });
  } else {
    // No animation, just toggle the theme
    document.documentElement.classList.toggle("dark", isDark);
  }

  // Update theme switcher icon
  const themeSwitcher = findElement<HTMLButtonElement>("#theme-switcher");
  if (themeSwitcher) {
    themeSwitcher.classList.toggle("i-moon-fill", !isDark);
    themeSwitcher.classList.toggle("i-sun-fill", isDark);
  }

  // Save theme preference
  setStorage(theme);

  // Dispatch theme change event
  triggerThemeChangeEvent(theme);
}

// Initialize theme on page load
export function initializeTheme() {
  changeTheme(getCurrentTheme());
}

function triggerThemeChangeEvent(theme: "dark" | "light") {
  triggerCustomEvent("theme-change", { theme });
}

function getCurrentTheme(): "dark" | "light" {
  return storage() === "dark" ? "dark" : "light";
}

// Setup theme switcher button
export function prepareThemeSwitcher() {
  triggerThemeChangeEvent(getCurrentTheme());
  const themeSwitcher = findElement<HTMLButtonElement>("#theme-switcher");
  if (!themeSwitcher) return;

  makeEventListener(themeSwitcher, "click", (e) => {
    changeTheme(
      storage() === "dark" ? "light" : "dark",
      true,
      e.clientX,
      e.clientY
    );
  });
}
