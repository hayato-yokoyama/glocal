"use client";

import { Anchor, MantineProvider, Title } from "@mantine/core";
import Link from "next/link";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      theme={{
        primaryColor: "cyan",
      }}
      defaultColorScheme="light"
    >
      <div className="mx-auto max-w-screen-xl px-4 pb-8">
        <Title unstyled order={1} className="my-4 text-center text-4xl  sm:mb-16 sm:mt-24 sm:text-7xl">
          <Anchor component={Link} href="/" variant="gradient" gradient={{ from: "cyan", to: "pink" }} inherit>
            Glocal
          </Anchor>
        </Title>
        <main>{children}</main>
      </div>
    </MantineProvider>
  );
};

export default AppShell;
