'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerWithEmail } from '@/lib/auth';

export default function RegisterPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      router.push('/dashboard');
    } catch {
      setError('Could not create account. This email may already be registered.');
    } finally {
      setLoading(false);
    }
  }

  const input = 'w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-white transition';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-5">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition">
            ← Back to listings
          </Link>
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-sm text-zinc-400">List your property on TED WITH THE HOUSE</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email address"
            autoComplete="email"
            className={input}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password (min 8 characters)"
            autoComplete="new-password"
            className={input}
          />
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            placeholder="Confirm password"
            autoComplete="new-password"
            className={input}
          />

          {error && (
            <p className="rounded-2xl bg-red-900/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-100 disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
