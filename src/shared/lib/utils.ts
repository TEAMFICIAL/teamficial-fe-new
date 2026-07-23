import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const KEYWORD_BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="40">
      <rect width="192" height="40" rx="20" fill="rgba(229,229,229,0.4)"/>
    </svg>
  `);
