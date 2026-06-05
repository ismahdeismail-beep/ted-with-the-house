import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <h1>TED WITH THE HOUSE</h1>

      <Link href="/feed">Feed</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/upload">Upload</Link>
      <Link href="/saved">Saved</Link>
    </div>
  );
}
