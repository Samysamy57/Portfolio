import Link from "next/link";

export const Logo = ({ name }: { name: string }) => {
  return (
    <Link href="/home" className="text-black dark:text-white font-bold text-xl">
      {name || "Your Logo"}.
    </Link>
  );
};
