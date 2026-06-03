export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} TED WITH THE HOUSE. Built with Next.js, Supabase, and
          Tailwind CSS.
        </p>
        <p>Secure real estate marketplace for rental and sales listings.</p>
      </div>
    </footer>
  );
}
