"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LivestreamData } from "@/types/wedding";

interface LiveStreamProps {
    data: LivestreamData;
}

export default function LiveStream({ data }: LiveStreamProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    if (!data?.enabled) return null;

    return (
        <section id="livestream" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.p
                        className="font-body text-gold-dark text-xs tracking-[0.4em] uppercase mb-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {data.date} • {data.time}
                    </motion.p>
                    <motion.h2
                        className="font-script text-5xl md:text-7xl text-gradient-gold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {data.title}
                    </motion.h2>
                    <motion.p
                        className="font-body text-foreground/80 text-sm"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {data.subtitle}
                    </motion.p>
                    <div className="section-divider mt-6" />
                </div>

                {/* Glassmorphism Video Card */}
                <motion.div
                    className="glass rounded-3xl p-2 md:p-3 relative overflow-hidden"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        boxShadow:
                            "0 0 60px rgba(212,168,83,0.1), inset 0 0 60px rgba(212,168,83,0.03)",
                    }}
                >
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/20 rounded-tl-lg z-20" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/20 rounded-tr-lg z-20" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/20 rounded-bl-lg z-20" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/20 rounded-br-lg z-20" />

                    {/* Video Container */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-ivory-dark">
                        {data.streamUrl ? (
                            <iframe
                                src={data.streamUrl}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Wedding Live Stream"
                            />
                        ) : (
                            /* Placeholder with Pulsing Play Button */
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-peach/80 to-gold/20">
                                <motion.button
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/20 backdrop-blur-xl border border-gold/30 flex items-center justify-center"
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(212,168,83,0.3)",
                                            "0 0 50px rgba(212,168,83,0.5)",
                                            "0 0 20px rgba(212,168,83,0.3)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg
                                        className="w-8 h-8 md:w-10 md:h-10 text-gold ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Bottom Note */}
                <motion.p
                    className="text-center mt-6 font-body text-foreground/70 text-xs tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Stream will be live on the wedding day
                </motion.p>
            </div>
        </section>
    );
}
