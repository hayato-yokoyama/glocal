import "../../app/globals.css";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="mx-auto max-w-sm md:max-w-md xl:max-w-xl">
        <h1>
          <Link href="/">Glocal</Link>
        </h1>
      </div>
    </header>
  );
};
export default Header;
