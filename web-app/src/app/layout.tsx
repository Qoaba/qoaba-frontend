import RootStyleRegistry from "./emotion";
import AuthProvider from "./context/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <AuthProvider>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
