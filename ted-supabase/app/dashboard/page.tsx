'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProperty } from '@/lib/properties';
import { onAuthStateChangedListener, signOutUser } from '@/lib/auth';
import { ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import type { NewProperty } from '@/lib/types';

export default function DashboardPage() {
  const [userEmail,   setUserEmail]   = useState<string | null>(null);
  const [title,       setTitle]       = useState('');
  const [location,    setLocation]    = useState('');
  const [price,       setPrice]       = useState('');
  const [type,        setType]        = useState<'rent' | 'sale'>('rent');
  const [description, setDescription] = useState('');
  const [images,      setImages]      = useState<FileList | null>(null);
  const [message,     setMessage]     = useState('');
  const [loading,     setLoading]     = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (!user) {
        router.push('/login');
        return;
      }
      setUserEmail(user.email ?? '');
    });

    return unsubscribe;
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!images || images.length === 0) {
      setMessage('Select at least one image to upload.');
      return;
    }

    setLoading(true);
    try {
      const property: NewProperty = {
        title,
        price:       Number(price),
        location,
        images:      [],   // filled in by addProperty after upload
        description,
        type
      };

      await addProperty(property, images);
      setMessage('Property uploaded successfully.');
      setTitle('');
      setLocation('');
      setPrice('');
      setDescription('');
      setImages(null);
    } catch {
      setMessage('Unable to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-3xl bg-white p-8 shadow-soft">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Admin dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Manage listings</h1>
            <p className="text-slate-600">Upload new properties and monitor your marketplace.</p>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              Signed in as{' '}
              <span className="font-semibold text-slate-900">{userEmail ?? 'Loading...'}</span>
            </div>
            <button
              onClick={async () => {
                await signOutUser();
                router.push('/login');
              }}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Add a new property</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                <span>Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                <span>Location</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                <span>Price</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                <span>Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'rent' | 'sale')}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </label>
            </div>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Property images</span>
              <input
                type="file"
                accept={ACCEPTED_IMAGE_TYPES}
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="text-sm text-slate-600"
              />
            </label>

            {message ? <p className="text-sm text-slate-600">{message}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {loading ? 'Uploading property…' : 'Upload property'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
