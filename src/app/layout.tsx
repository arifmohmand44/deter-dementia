import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import Providers from '@/components/providers/session-provider';

// Initialize the Inter font with subsets
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true  // New recommended option in Next 15
})

// Metadata for SEO and PWA
export const metadata: Metadata = {
    title: 'Deter Dementia',
    description: 'A comprehensive app for dementia prevention and management',
    metadataBase: new URL('https://your-domain.com'),
    manifest: '/manifest.json',
    applicationName: 'Deter Dementia',  // Updated format
    appleWebApp: {  // Updated format for iOS PWA settings
        capable: true,
        title: 'Deter Dementia',
        statusBarStyle: 'default'
    },
}

// Viewport configuration
export const viewport: Viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,  // Changed for better accessibility
    userScalable: true,  // Changed for better accessibility
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={inter.className}>
            <body>
                {/* Enable streaming with Suspense */}
                <main className="min-h-screen bg-gray-50">
                    {/* <Providers> */}
                        {children}
                    {/* </Providers> */}
                </main>
            </body>
        </html>
    )
}
