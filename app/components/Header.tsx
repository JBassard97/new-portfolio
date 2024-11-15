import Link from "next/link";
import Image from "next/image";
import house from "../../public/house.svg";
import octocat from "../../public/github.svg";
import react from "../../public/react.svg";

export default function Header() {
  return (
    <header>
      <ul>
        <Link href="/">
          <Image src={house} alt="Home"></Image>
        </Link>
        <Link href="/github">
          <Image src={octocat} alt="GitHub"></Image>
        </Link>
        <Link href="technologies">
          <Image src={react} alt="Technologies"></Image>
        </Link>
      </ul>
    </header>
  );
}
