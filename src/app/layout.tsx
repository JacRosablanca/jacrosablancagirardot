import React from 'react'
import '../app/globals.css'
import Header from '@/components/header/page'
import Nav from '@/components/nav/page'
import Footer from '@/components/footer/page'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-[#f5f6fa] text-[#18181b] dark:bg-[#18181b] dark:text-[#f5f6fa] font-sans antialiased transition-colors duration-300">
        <Header />
        <Nav />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}