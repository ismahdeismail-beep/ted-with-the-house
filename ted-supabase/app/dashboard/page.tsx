'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProperty } from '@/lib/properties';
import { onAuthStateChangedListener, signOutUser } from '@/lib/auth';
import {
  NAIROBI_AREAS, NAIROBI_AREA_NAMES,
  PROPERTY_TYPES, AMENITIES,
  ACCEPTED_IMAGE_TYPES, ACCEPTED_VIDEO_TYPES,
  MAX_VIDEOS, MAX_IMAGES
} from '@/lib/constants';
import type { NewProperty, PropertyType, OwnerType, VerifiedStatus } from '@/lib/types';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message,   setMessage]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const router = useRouter();

  // Form state
  const [title,       setTitle]       = useState('');
  const [price,       setPrice]       = useState('');
  const [area,        setArea]        = useState('');
  const [estate,      setEstate]      = useState('');
  const [propType,    setPropType]    = useState<PropertyType>('apartment');
  const [ownerType,   setOwnerType]   = useState<OwnerType>('owner');
  const [verified,    setVerified]    = useState<VerifiedStatus>('unverified');
  const [amenities,   setAmenities]   = useState<string[]>([]);
  const [whatsapp,    setWhatsapp]    = useState('');
  const [phone,       setPhone]       = useState('');
  const [description, setDescription] = useState('');
  const [videos,      setVideos]      = useState<FileList | null>(null);
  const [images,      setImages]      = useState<FileList | null>(null);

  const estates = area ? (NAIROBI_AREAS[area] ?? []) : [];

  useEffect(() => {
    return onAuthStateChangedListener(user => {
      if (!user) { router.push('/login'); return; }
      setUserEmail(user.email ?? '');
    });
  }, [router]);

  function toggleAmenity(value: string) {
    setAmenities(prev =>
      prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!area || !estate) { setMessage('Please select an area and estate.'); return; }
    if (!videos?.length && !images?.length) { setMessage('Upload at least one video or image.'); return; }

    setLoading(true);
    try {
      const property: NewProperty = {
        title,
        price:           Number(price),
        location:        { city: 'Nairobi', area, estate },
        property_type:   propType,
        amenities,
        verified_status: verified,
        owner_type:      ownerType,
        whatsapp:        whatsapp || null,
        phone:           phone    || null,
        description:     description || null,
        videos:          [],
        images:          []
      };

      await addProperty(property, videos, images);
      setMessage('✅ Property listed successfully!');
      // Reset
      setTitle(''); setPrice(''); setArea(''); setEstate('');
      setAmenities([]); setWhatsapp(''); setPhone(''); setDescription('');
      setVideos(null); setImages(null);
    } catch (err) {
      setMessage(`❌ Error: ${err instanceof Error ? err.message : 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-white transition';
  const labelClass = 'block space-y-2 text-sm font-medium text-zinc-300';

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container max-w-2xl py-10 px-5">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-zinc-400">{userEmail}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/')} className="rounded-2xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
              View feed
            </button>
            <button onClick={async () => { await signOutUser(); router.push('/login'); }} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-100">
              Sign out
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <label className={labelClass}>
            <span>Property title</span>
            <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Spacious 2BR in Westlands" className={inputClass} />
          </label>

          {/* Price */}
          <label className={labelClass}>
            <span>Monthly rent (KES)</span>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" placeholder="e.g. 25000" className={inputClass} />
          </label>

          {/* Location */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-300">Location</p>
            <select value={area} onChange={e => { setArea(e.target.value); setEstate(''); }} required className={inputClass}>
              <option value="">Select area</option>
              {NAIROBI_AREA_NAMES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            {estates.length > 0 && (
              <select value={estate} onChange={e => setEstate(e.target.value)} required className={inputClass}>
                <option value="">Select estate</option>
                {estates.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            )}
          </div>

          {/* Property type + Owner type */}
          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              <span>Property type</span>
              <select value={propType} onChange={e => setPropType(e.target.value as PropertyType)} className={inputClass}>
                {PROPERTY_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
              </select>
            </label>
            <label className={labelClass}>
              <span>You are a…</span>
              <select value={ownerType} onChange={e => setOwnerType(e.target.value as OwnerType)} className={inputClass}>
                <option value="owner">Owner</option>
                <option value="agent">Agent</option>
              </select>
            </label>
          </div>

          {/* Verification */}
          <label className={labelClass}>
            <span>Listing status</span>
            <select value={verified} onChange={e => setVerified(e.target.value as VerifiedStatus)} className={inputClass}>
              <option value="unverified">Unverified</option>
              <option value="verified_owner">Verified Owner</option>
              <option value="verified_agent">Verified Agent</option>
            </select>
          </label>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              <span>WhatsApp number</span>
              <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="e.g. 254712345678" className={inputClass} />
            </label>
            <label className={labelClass}>
              <span>Phone number</span>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 0712345678" className={inputClass} />
            </label>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-300">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map(am => {
                const active = amenities.includes(am.value);
                return (
                  <button type="button" key={am.value} onClick={() => toggleAmenity(am.value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${active ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                    {am.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <label className={labelClass}>
            <span>Description</span>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the property, neighbourhood, access, etc." className={`${inputClass} resize-none`} />
          </label>

          {/* Videos */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-300">Videos (up to {MAX_VIDEOS})</p>
            <p className="text-xs text-zinc-500">Short walkthrough videos — MP4, WebM or MOV</p>
            <input type="file" accept={ACCEPTED_VIDEO_TYPES} multiple onChange={e => setVideos(e.target.files)} className="text-sm text-zinc-400" />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-300">Images (up to {MAX_IMAGES}, fallback)</p>
            <input type="file" accept={ACCEPTED_IMAGE_TYPES} multiple onChange={e => setImages(e.target.files)} className="text-sm text-zinc-400" />
          </div>

          {message && (
            <p className={`rounded-2xl px-4 py-3 text-sm ${message.startsWith('✅') ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'}`}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-white py-4 text-sm font-bold text-black hover:bg-zinc-100 disabled:opacity-50 transition">
            {loading ? 'Uploading listing…' : '🚀 Publish listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
