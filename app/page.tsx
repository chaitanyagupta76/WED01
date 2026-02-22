"use client";

import { useState, useCallback } from "react";
import weddingData from "@/data/wedding.json";
import { WeddingData } from "@/types/wedding";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Venue from "@/components/Venue";
import LiveStream from "@/components/LiveStream";
import Memories from "@/components/Memories";
import Closing from "@/components/Closing";

const data = weddingData as WeddingData;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <Loader site={data.site} onComplete={handleLoaderComplete} />

      {/* Main Content */}
      {!isLoading && (
        <>
          <Navbar data={data} />

          <main>
            {data.hero?.enabled && <Hero data={data.hero} />}

            {data.story?.enabled && (
              <>
                <div className="section-divider" />
                <Story data={data.story} />
              </>
            )}

            {data.venue?.enabled && (
              <>
                <div className="section-divider" />
                <Venue data={data.venue} id="venue" />
              </>
            )}

            {data.reception?.enabled && (
              <>
                <div className="section-divider" />
                <Venue data={data.reception} id="reception" />
              </>
            )}

            {data.livestream?.enabled && (
              <>
                <div className="section-divider" />
                <LiveStream data={data.livestream} />
              </>
            )}

            {data.memories?.enabled && (
              <>
                <div className="section-divider" />
                <Memories data={data.memories} />
              </>
            )}

            {data.closing?.enabled && (
              <>
                <div className="section-divider" />
                <Closing data={data.closing} />
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="py-8 text-center border-t border-gold/10">
            <p className="font-body text-ivory/20 text-xs tracking-widest">
              Made with ❤ for {data.site.coupleNames}
            </p>
          </footer>
        </>
      )}
    </>
  );
}
