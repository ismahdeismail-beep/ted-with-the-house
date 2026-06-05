import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:       'TED WITH THE HOUSE',
  description: 'Discover Nairobi rentals through short property videos.',
};

export const viewport: Viewport = {
  width:               'device-width',
  initialScale:        1,
  viewportFit:         'cover',
  themeColor:          '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        {children}
      </body>
    </html>
  );
}
