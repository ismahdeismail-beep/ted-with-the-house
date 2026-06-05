'use client';

import { useEffect, useRef, useState } from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1080&q=80';

interface VideoPlayerProps {
  videos:   string[];
  images:   string[];
  title:    string;
  isActive: boolean;
}

export default function VideoPlayer({ videos, images, title, isActive }: VideoPlayerProps) {
  const videoRef            = useRef<HTMLVideoElement>(null);
  const [loaded,  setLoaded]  = useState(false);
  const [failed,  setFailed]  = useState(false);
  const [muted,   setMuted]   = useState(true);

  const src    = videos[0] ?? null;
  const poster = images[0] ?? PLACEHOLDER;

  // Play / pause when active card changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    if (isActive) {
      v.currentTime = 0;
      v.play().catch(() => { /* autoplay blocked – silently ignore */ });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive, src]);

  // Reset failed state when source changes
  useEffect(() => { setFailed(false); setLoaded(false); }, [src]);

  function toggleMute() {
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setMuted(next);
  }

  // No video – show image
  if (!src || failed) {
    return (
      <img
        src={poster}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    );
  }

  return (
    <div className="absolute inset-0" onClick={toggleMute}>
      {/* Poster shown while video loads */}
      <img
        src={poster}
        alt={title}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        draggable={false}
      />

      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload={isActive ? 'auto' : 'metadata'}
        onLoadedData={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />

      {/* Mute hint */}
      <div className="pointer-events-none absolute top-14 left-4 z-10">
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {muted ? '🔇 Tap to unmute' : '🔊 Tap to mute'}
        </span>
      </div>
    </div>
  );
}
