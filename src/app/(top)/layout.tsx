import "@/app/globals.css";
import AppShell from "@/components/providers/AppShell";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  description: "ユーザーの評価の高さではなく、レビューの数の多さで場所を見つけることができる場所検索サイト",
  title: "Glocal | レビューの数で場所を見つける場所検索サイト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />}
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
