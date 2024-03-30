import "../../app/globals.css";
import { Anchor, Title } from "@mantine/core";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-start">
      <Title order={1}>
        <Anchor component={Link} href="/" variant="gradient" gradient={{ from: "cyan", to: "pink" }} inherit>
          Glocal
        </Anchor>
      </Title>
    </header>
  );
};
export default Header;
