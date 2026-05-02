import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SentinelX SecureChain GovTrust',
  description: 'Production-grade government trust and cyber-defense platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
            pointerEvents: 'none',
          }}
        >
          <source src="/Vemana_College.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to keep UI readable */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(10, 20, 40, 0.78)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
        {children}
      </body>
    </html>
  );
}
