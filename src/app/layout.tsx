import "./globals.css"

import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "src/@/components/ui/toaster"
import { cn } from "src/@/lib/utils"
import { WalletContext } from "src/contexts/WalletContext"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { ModeToggle } from 'src/@/components/ui/mode-toggle';
import { MavisLogo } from "src/connectors/MavisLogo"
import { Auth } from "src/components/auth"

export const metadata: Metadata = {
  applicationName: "Mavis ID Check-in Dapp",
  title: "Mavis ID Check-in Dapp",
  description: "A decentralized application (DApp) for daily check-ins using Mavis ID, providing a secure and seamless authentication experience. Developed by Sky Mavis.",
  authors: [{ name: "Sky Mavis", url: "https://skymavis.com" }],

  icons: "https://cdn.skymavis.com/explorer-cdn/asset/fav.ico",
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <ThemeProvider attribute="class">
      <Theme>
        <main>
        <WalletContext>
        <div className="border border-gray-300 w-full mx-auto backdrop-blur-sm flex-none lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/95 dark:bg-slate-900/7 px-12 dark:text-dark">
            <div className="w-full flex items-center justify-between flex-wrap gap-2 py-9 flex-col lg:flex-row">
              <Link href="/">
                <div className="flex items-center gap-2 relative select-none">
      <MavisLogo width={40} />
                  <span className="cursor-pointer mb-0 text-4xl font-black text-center">
                    D-Check
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
              
                </div>
                <ModeToggle />
                <Auth/>
              </div>
            </div>
          </div>
          {children}
          </WalletContext>
        </main>
        <Toaster />
        </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout


