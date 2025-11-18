import { copyTextToClipboard } from "../utils/copy-text";

export function initCodeCopy(): void {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll("pre:has(code)");

  codeBlocks.forEach((pre) => {
    // Create copy button
    const button = document.createElement("button");
    button.className = "code-copy-btn";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    // Add click handler
    button.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      if (!code) return;

      const text = code.textContent || "";
      const success = await copyTextToClipboard(text);

      if (success) {
        button.textContent = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("copied");
        }, 2000);
      } else {
        button.textContent = "Failed";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 2000);
      }
    });

    // Wrap pre in a container if not already
    if (!pre.parentElement?.classList.contains("code-block-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
    }
  });
}
