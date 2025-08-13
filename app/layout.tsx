import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'High Caliber Security - Professional Security Services',
  description: 'Professional security guard services across South Africa. Get instant quotes for personal and business security solutions.',
  generator: 'High Caliber Security',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${poppins.style.fontFamily};
  --font-sans: ${poppins.variable};
}
        `}</style>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
