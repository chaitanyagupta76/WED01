"use client";

import { motion } from "framer-motion";
import { HeroData } from "@/types/wedding";
import { useEffect, useState } from "react";

interface HeroProps {
    data: HeroData;
}

function FloatingPetals() {
    const [petals, setPetals] = useState<
        { id: number; left: number; delay: number; duration: number; size: number }[]
    >([]);

    useEffect(() => {
        const generated = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: Math.random() * 6 + 8,
            size: Math.random() * 16 + 8,
        }));
        setPetals(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {petals.map((p) => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        width: p.size,
                        height: p.size,
                        background: `radial-gradient(ellipse, ${["rgba(212,168,83,0.6)", "rgba(255,182,193,0.5)", "rgba(255,160,122,0.5)"][p.id % 3]
                            }, transparent)`,
                        borderRadius: "50% 0 50% 0",
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}
        </div>
    );
}

function GlowingParticles() {
    const [particles, setParticles] = useState<
        { id: number; left: number; top: number; delay: number; size: number }[]
    >([]);

    useEffect(() => {
        const generated = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            size: Math.random() * 4 + 2,
        }));
        setParticles(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="sparkle-particle"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        animationDelay: `${p.delay}s`,
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero({ data }: HeroProps) {
    if (!data?.enabled) return null;

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${data.backgroundImage})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0505]" />
            </div>

            <FloatingPetals />
            <GlowingParticles />

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                {/* Ornamental Top */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/60" />
                        <span className="text-gold/60 text-xs tracking-[0.5em] uppercase font-body">
                            ✦ ✦ ✦
                        </span>
                        <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/60" />
                    </div>
                </motion.div>

                {/* Save the Date */}
                <motion.p
                    className="font-body text-gold-light/80 text-xs md:text-sm tracking-[0.4em] uppercase mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {data.saveTheDate}
                </motion.p>

                {/* Couple Names */}
                <motion.h1
                    className="font-script text-6xl md:text-8xl lg:text-9xl text-gradient-gold mb-2 leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    {data.brideName}
                </motion.h1>

                <motion.div
                    className="flex items-center justify-center gap-4 my-2 md:my-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <div className="h-[1px] w-12 bg-gold/40" />
                    <span className="font-script text-gold text-3xl md:text-4xl">&</span>
                    <div className="h-[1px] w-12 bg-gold/40" />
                </motion.div>

                <motion.h1
                    className="font-script text-6xl md:text-8xl lg:text-9xl text-gradient-gold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    {data.groomName}
                </motion.h1>

                {/* Date & Location */}
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <p className="font-heading text-2xl md:text-3xl text-ivory/90 tracking-wider">
                        {data.date}
                    </p>
                    <p className="font-body text-sm text-ivory/50 tracking-[0.3em] uppercase">
                        {data.location}
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="mx-auto w-6 h-10 border border-gold/30 rounded-full flex items-start justify-center p-1"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    </motion.div>
                    <p className="text-ivory/30 text-xs mt-2 tracking-widest uppercase">Scroll</p>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0505] to-transparent z-20" />
        </section>
    );
}
