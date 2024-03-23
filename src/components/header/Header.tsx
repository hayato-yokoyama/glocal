import "../../app/globals.css";
import { Anchor, Title } from "@mantine/core";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex h-16 max-w-sm items-center justify-start md:max-w-md xl:max-w-xl">
        <Title order={1}>
          <Anchor component={Link} href="/" size="2xl" underline="never">
            Glocal
          </Anchor>
        </Title>
      </div>
    </header>
  );
};
export default Header;
