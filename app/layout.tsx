import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothFollower from "@/components/SmoothFollower";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fitnesswarrior.in"),
  title: "Fitness Warrior | Best Gym in Bhilai | Top Fitness Center in Bhilai, Chhattisgarh",
  description: "Transform Your Dawns at Fitness Warrior, the best gym in Bhilai. Elite performance training, CrossFit, Zumba, and Strength training across 4 locations: Nehru Nagar West, Smriti Nagar, Ram Nagar, and Kailash Nagar.",
  keywords: [
    "Best gym in Bhilai",
    "Fitness center in Bhilai",
    "Gym near me Bhilai",
    "Top gym in Bhilai",
    "CrossFit in Bhilai",
    "Personal Trainer Bhilai",
    "Zumba classes in Bhilai",
    "Strength training Bhilai",
    "Body transformation program Bhilai",
    "Gym in Nehru Nagar Bhilai"
  ],
  authors: [{ name: "Fitness Warrior" }],
  creator: "Fitness Warrior",
  publisher: "Fitness Warrior",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://fitnesswarrior.in", // Replace with actual domain if known
  },
  openGraph: {
    title: "Fitness Warrior | Best Gym & Fitness Center in Bhilai",
    description: "Elite performance-focused gym with 4 strategic locations across Bhilai. CrossFit, Strength, and Total Body Transformation.",
    url: "https://fitnesswarrior.in",
    siteName: "Fitness Warrior",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists in public/
        width: 1200,
        height: 630,
        alt: "Fitness Warrior Bhilai Gym Interior",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Warrior | Best Gym in Bhilai",
    description: "Transform Your Dawns at Bhilai's premier fitness destination.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": "https://fitnesswarrior.in/#organization",
    "name": "Fitness Warrior",
    "url": "https://fitnesswarrior.in",
    "logo": "https://fitnesswarrior.in/logo.png",
    "description": "Premium multi-location gym and fitness center in Bhilai, Chhattisgarh, specialized in CrossFit, Strength Training and Body Transformations.",
    "telephone": "+91-91311-07722",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhilai",
      "addressRegion": "Chhattisgarh",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1926",
      "longitude": "81.3509"
    },
    "openingHours": "Mo-Sa 05:00-22:00",
    "sameAs": [
      "https://instagram.com/fitnesswarriorbhilai"
    ],
    "areaServed": "Bhilai",
    "subOrganization": [
      {
        "@type": "ExerciseGym",
        "name": "Fitness Warrior Kailash Nagar Branch",
        "address": "Ekta Chowk Road, in front of Unique Furniture, Kailash Nagar, I/E, Bhilai, Chhattisgarh 490026"
      },
      {
        "@type": "ExerciseGym",
        "name": "Fitness Warrior Ram Nagar Branch",
        "address": "Post Office Road, opposite Hanuman Mandir, Supela, Bhilai, Chhattisgarh 490023"
      },
      {
        "@type": "ExerciseGym",
        "name": "Fitness Warrior Smriti Nagar Branch",
        "address": "Above ICICI Bank, Near Bharat Petroleum, Smriti Nagar, Bhilai, Chhattisgarh"
      },
      {
        "@type": "ExerciseGym",
        "name": "Fitness Warrior Nehru Nagar West Branch",
        "address": "Street No. 9, in front of 90s Cafe, Vidya Vihar Colony, Nehru Nagar West, Bhilai, Chhattisgarh 490020"
      }
    ]
  };

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Geo Tags */}
        <meta name="geo.region" content="IN-CT" />
        <meta name="geo.placename" content="Bhilai" />
        <meta name="geo.position" content="21.1926;81.3509" />
        <meta name="ICBM" content="21.1926, 81.3509" />
      </head>
      <body className="bg-dark text-white antialiased font-sans overflow-x-hidden">
        <ScrollToTop />
        <SmoothFollower />
        {children}
      </body>
    </html>
  );
}
