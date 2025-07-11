import Link from "next/link";
import { ModeToggle } from "./ui/toggle-mode";
export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex justify-around ">
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          {" "}
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
