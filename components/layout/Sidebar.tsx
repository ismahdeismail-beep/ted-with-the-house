import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">

      <h1 className="font-bold text-lg mb-6">
        TED WITH THE HOUSE
      </h1>

      <nav className="flex flex-col gap-3 text-sm">

        <Link href="/feed">Feed</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/saved">Saved</Link>

      </nav>

    </aside>
  );
}
