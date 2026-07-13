import { SVGProps } from "react";

export function ChevronIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="48" height="48" rx="24" fill="#F2F2F2" />
      <path
        d="M26.75 34.25L17 24.5L26.75 14.75L29.025 17.025L21.55 24.5L29.025 31.975L26.75 34.25Z"
        fill="#5F5F5F"
      />
    </svg>
  );
}
