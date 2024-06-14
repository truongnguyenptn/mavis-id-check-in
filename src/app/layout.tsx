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
import { MavisIdAuth } from "@sky-mavis/mavis-id-sdk"
import { Button } from "src/@/components/ui/button"
import { MavisLogo } from "src/connectors/MavisLogo"
import { useWalletgoDialog } from "src/hooks/useWalletgoDialog"
import { useWrapToast } from "src/hooks/useWrapToast"
import { Auth } from "src/components/Auth"

export const metadata: Metadata = {
  applicationName: "Mavis ID Playground",
  title: "ID Playground",
  description: "Generated by Next.js",
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
        <div className="container mx-auto">
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
          <WalletContext>{children}</WalletContext>
        </main>
        <Toaster />
        </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout


