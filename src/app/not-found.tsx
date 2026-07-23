import { ErrorView } from "@/shared/components/ui/ErrorView";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <ErrorView />
    </main>
  );
}
