"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { VenueData } from "@/types/wedding";

interface VenueProps {
    data: VenueData;
    id?: string;
}

export default function Venue({ data, id = "venue" }: VenueProps) {
    if (!data?.enabled) return null;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id={id} className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
            {/* Background Mandala Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(212,168,83,0.4) 0%, transparent 70%)`,
                        backgroundSize: "300px 300px",
                        backgroundPosition: "center",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.p
                        className="font-body text-gold/60 text-xs tracking-[0.4em] uppercase mb-4"
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
                        {data.sectionTitle}
                    </motion.h2>
                    <div className="section-divider" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Venue Image */}
                    <motion.div
                        className="rounded-2xl overflow-hidden aspect-[4/3] relative group"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${data.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {/* Fallback gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-maroon/30 to-gold/10" />

                        {/* Venue name overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="font-heading text-2xl md:text-3xl text-ivory">{data.name}</h3>
                        </div>

                        {/* Decorative border */}
                        <div className="absolute inset-3 border border-gold/10 rounded-xl pointer-events-none" />
                    </motion.div>

                    {/* Venue Details */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="glass rounded-2xl p-6 md:p-8">
                            {/* Venue Name */}
                            <h3 className="font-heading text-2xl md:text-3xl text-ivory mb-4">{data.name}</h3>

                            {/* Address */}
                            <div className="flex items-start gap-3 mb-4">
                                <motion.div
                                    className="text-gold mt-1 text-xl"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                >
                                    📍
                                </motion.div>
                                <p className="font-body text-ivory/70 text-sm leading-relaxed">{data.address}</p>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-gold text-xl">📅</span>
                                <p className="font-body text-ivory/70 text-sm">
                                    {data.date} | {data.time}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent my-4" />

                            {/* Get Directions Button */}
                            <a
                                href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-dark to-gold rounded-full font-body text-sm text-[#0A0505] font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                            >
                                <span>Get Directions</span>
                                <span>→</span>
                            </a>
                        </div>

                        {/* Map Embed */}
                        <motion.div
                            className="rounded-2xl overflow-hidden border border-gold/10 aspect-video"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <iframe
                                src={data.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`${data.name} Map`}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
