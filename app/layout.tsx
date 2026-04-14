import './globals.css'
import { Metadata } from 'next'
import { Kanit } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Siksha | study abroad portal',
  description: 'Study portal',
}
const kanit = Kanit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
