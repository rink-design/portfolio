import Link from "next/link";

export function Nav() {
  return (
    <header className="wrap fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 mix-blend-difference text-[#ebe8e2]">
      <Link href="/" className="t-label" aria-label="RINK — home">RINK</Link>
      <nav className="t-label flex gap-5 md:gap-8">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
