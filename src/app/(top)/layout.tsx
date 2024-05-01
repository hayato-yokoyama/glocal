import "@/app/globals.css";
import { Anchor, ColorSchemeScript, MantineProvider, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import Link from "next/link";

export const metadata = {
  description: "ユーザーの評価の高さではなく、レビューの数の多さで場所を見つけることができる場所検索サイト",
  title: "Glocal | レビューの数で場所を見つける場所検索サイト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            primaryColor: "cyan",
          }}
        >
          <div className="mx-auto max-w-screen-xl px-4">
            <Title unstyled order={1} className="my-4 text-center text-4xl  sm:mb-16 sm:mt-24 sm:text-7xl">
              <Anchor component={Link} href="/" variant="gradient" gradient={{ from: "cyan", to: "pink" }} inherit>
                Glocal
              </Anchor>
            </Title>
            <main>{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
