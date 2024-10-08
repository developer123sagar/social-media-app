import Link from "next/link";

import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex-center max-w-7xl gap-5 px-4 sm:px-5 py-3">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
          Twittee
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}