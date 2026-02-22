"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ClosingData } from "@/types/wedding";

interface ClosingProps {
    data: ClosingData;
}

function SparkleOverlay() {
    const [sparkles, setSparkles] = useState<
        { id: number; left: number; top: number; delay: number; duration: number; size: number }[]
    >([]);

    useEffect(() => {
        const generated = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
            size: Math.random() * 5 + 2,
        }));
        setSparkles(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sparkles.map((s) => (
                <div
                    key={s.id}
                    className="sparkle-particle"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                        width: s.size,
                        height: s.size,
                    }}
                />
            ))}
        </div>
    );
}

export default function Closing({ data }: ClosingProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    if (!data?.enabled) return null;

    return (
        <section
            id="closing"
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
            ref={ref}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-ivory/20 to-ivory/60" />
            </div>

            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-peach/40 via-ivory/60 to-gold/10" />

            <SparkleOverlay />

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-20">
                {/* Ornamental Top */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/40" />
                        <div className="w-3 h-3 border border-gold/40 rotate-45" />
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/40" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    className="font-body text-gold-dark text-xs tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {data.title}
                </motion.h2>

                {/* Message */}
                <motion.p
                    className="font-body text-foreground/85 text-sm tracking-[0.3em] uppercase leading-relaxed mb-8 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    &ldquo;{data.message}&rdquo;
                </motion.p>

                {/* Couple Names */}
                <motion.p
                    className="font-script text-3xl md:text-4xl text-gold-dark mb-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {data.coupleNames}
                </motion.p>

                {/* Bottom Ornament */}
                <motion.div
                    className="flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="h-[1px] w-12 bg-gold/30" />
                    <span className="text-gold/40 text-xs">❤</span>
                    <div className="h-[1px] w-12 bg-gold/30" />
                </motion.div>
            </div>
        </section>
    );
}
