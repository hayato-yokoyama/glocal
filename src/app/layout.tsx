import "./globals.css";
import Header from "@/components/header/Header";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata = {
  description: "Decide where to go based on the number of reviews.",
  title: "Glocal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Header />
          <main className="mx-auto max-w-sm md:max-w-md xl:max-w-xl">
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
