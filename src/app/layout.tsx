import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Recursive } from "next/font/google"

const recursive = Recursive({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  
  title: 'Moh Shop | Coques de téléphone personnalisées',
  description: 'Créez votre coque de téléphone unique en uploadant votre photo préférée. Design personnalisé, impression de qualité et livraison rapide.',
  keywords: 'coque téléphone personnalisée, coque photo, personnalisation coque, coque sur mesure, cadeau personnalisé, accessoires téléphone',
  icons: {
    icon: '/favicon.ico',
  },

  metadataBase: new URL('https://moh-shop.vercel.app'),
  

  openGraph: {
    title: 'Moh Shop - Créez Votre Coque Unique',
    description: 'Transformez vos photos en coques de téléphone uniques. Service de personnalisation en ligne simple et rapide.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://moh-shop.vercel.app', 
    siteName: 'Moh Shop',
    images: [
      {
        url: '/thumbnail.png', 
        width: 1200,
        height: 630,
        alt: 'Moh Shop - Coques personnalisées',
      }
    ],
    
  },

  
  twitter: {
    card: 'summary_large_image',
    title: 'Moh Shop - Coques Personnalisées',
    description: 'Créez votre coque unique avec vos photos préférées',
    images: ['/thumbnail.png'], 
  },

 
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  

  appleWebApp: {
    capable: true,
    title: 'Moh Shop',
    statusBarStyle: 'default',
  },

  
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${recursive.className} antialiased`}
      >
        <Navbar />
        <main className="flex flex-col grainy-light min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex flex-1 flex-col h-full">
            {children}
          </div>
          <Footer />
        </main>
        <Toaster />

      </body>
    </html>
  );
}
