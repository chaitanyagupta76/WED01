"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteConfig } from "@/types/wedding";

interface LoaderProps {
    site: SiteConfig;
    onComplete: () => void;
}

interface BokehLight {
    id: number;
    width: number;
    height: number;
    left: string;
    top: string;
    colorIndex: number;
    duration: number;
    delay: number;
}

const BOKEH_COLORS = [
    "rgba(212,168,83,0.15)",
    "rgba(128,0,32,0.1)",
    "rgba(255,192,203,0.08)",
];

export default function Loader({ site, onComplete }: LoaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [bokehLights, setBokehLights] = useState<BokehLight[]>([]);

    useEffect(() => {
        const lights = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            width: Math.random() * 100 + 30,
            height: Math.random() * 100 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            colorIndex: i % 3,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
        setBokehLights(lights);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center bokeh-bg"
                    style={{ background: "#0A0505" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Bokeh Lights */}
                    {bokehLights.map((light) => (
                        <motion.div
                            key={light.id}
                            className="absolute rounded-full"
                            style={{
                                width: light.width,
                                height: light.height,
                                left: light.left,
                                top: light.top,
                                background: `radial-gradient(circle, ${BOKEH_COLORS[light.colorIndex]}, transparent)`,
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: light.duration,
                                repeat: Infinity,
                                delay: light.delay,
                            }}
                        />
                    ))}

                    <div className="relative z-10 text-center">
                        {/* Mandala Ring */}
                        <motion.div
                            className="mx-auto mb-8 w-32 h-32 rounded-full border-2 border-gold/30 flex items-center justify-center"
                            style={{
                                boxShadow:
                                    "0 0 40px rgba(212,168,83,0.2), inset 0 0 40px rgba(212,168,83,0.1)",
                            }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <motion.div
                                className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <motion.span
                                    className="font-script text-gold text-4xl"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    {site.coupleNames
                                        .split("&")
                                        .map((n) => n.trim()[0])
                                        .join(" & ")}
                                </motion.span>
                            </motion.div>
                        </motion.div>

                        {/* Couple Names */}
                        <motion.h1
                            className="font-script text-5xl md:text-6xl text-gradient-gold mb-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        >
                            {site.coupleNames}
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="font-body text-ivory/60 text-sm tracking-[0.3em] uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                        >
                            {site.tagline}
                        </motion.p>

                        {/* Loading Bar */}
                        <motion.div
                            className="mt-8 mx-auto h-[1px] bg-gold/30 overflow-hidden"
                            style={{ width: 200 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
