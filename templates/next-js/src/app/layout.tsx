import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextLink from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ark UI | Next.js Template',
  description: 'Am Ark UI template for Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <header>
            <ul>
              <li>
                <NextLink href="/">Home</NextLink>
              </li>
              <li>
                <NextLink href="/about">About</NextLink>
              </li>
            </ul>
          </header>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
