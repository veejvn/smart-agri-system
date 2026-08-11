import { useEffect } from "react";

/**
 * Custom hook to animate chart bars on mount.
 * Replaces duplicated useEffect logic in Dashboard and Admin pages.
 *
 * @param selector - CSS class selector for chart bars (without the dot)
 * @param delay - Delay in ms before animation starts (default: 100)
 */
export function useChartAnimation(selector: string, delay = 100) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const bars = document.querySelectorAll(`.${selector}`);
      bars.forEach((bar) => {
        const h = bar.getAttribute("data-height") || "10%";
        (bar as HTMLElement).style.height = h;
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [selector, delay]);
}
