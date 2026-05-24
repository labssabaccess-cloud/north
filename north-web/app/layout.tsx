import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'North - Learn AI by Watching',
  description:
    'North teaches people how to use AI tools through cinematic guided screen lessons.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
