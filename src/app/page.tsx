"use client";
import React, { Component } from 'react'
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

export class page extends Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f6fa] dark:bg-[#18181b] transition-colors duration-300">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          
        </main>
        <Footer />
      </div>
    )
  }
}

export default page