export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-160 bg-white px-4">
      {children}
    </div>
  );
}
