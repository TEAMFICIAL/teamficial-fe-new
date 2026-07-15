import { cn } from "@/shared/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function LandingContainer({
  children,
  className,
  innerClassName,
}: Props) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className={cn("mx-auto w-full min-w-80 max-w-5xl", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
