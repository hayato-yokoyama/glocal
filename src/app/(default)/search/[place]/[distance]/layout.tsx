import "@/app/globals.css";
import Header from "@/components/header/Header";
import { ColorSchemeScript, MantineProvider, Space } from "@mantine/core";
import "@mantine/core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  description: "ユーザーの評価の高さではなく、レビューの数の多さで場所を見つけることができる場所検索サイト",
  title: "Glocal | レビューの数で場所を見つける場所検索サイト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-mantine-color-scheme="light">
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />}
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider
          theme={{
            primaryColor: "cyan",
          }}
          defaultColorScheme="light"
        >
          <div className="mx-auto max-w-screen-xl px-4">
            <Header />
            <Space h="md" />
            <main>{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
