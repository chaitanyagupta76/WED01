"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { WeddingData } from "@/types/wedding";

interface NavbarProps {
    data: WeddingData;
}

export default function Navbar({ data }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 200], [0, 1]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        data.hero?.enabled && { label: "Home", href: "#hero" },
        data.story?.enabled && { label: "Our Story", href: "#story" },
        data.venue?.enabled && { label: "Venue", href: "#venue" },
        data.reception?.enabled && { label: "Reception", href: "#reception" },
        data.livestream?.enabled && { label: "Live", href: "#livestream" },
        data.memories?.enabled && { label: "Memories", href: "#memories" },
        data.closing?.enabled && { label: "RSVP", href: "#closing" },
    ].filter(Boolean) as { label: string; href: string }[];

    const handleClick = (href: string) => {
        setIsMobileOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "py-2" : "py-4"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 3.5 }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        opacity: bgOpacity,
                        background: "rgba(255,249,243,0.95)",
                        backdropFilter: "blur(20px)",
                        borderBottom: "1px solid rgba(212,168,83,0.15)",
                    }}
                />

                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between relative z-10">
                    {/* Logo / Names */}
                    <a
                        href="#hero"
                        className="font-script text-gold-dark text-3xl hover:text-gold transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick("#hero");
                        }}
                    >
                        {data.site.coupleNames}
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(item.href);
                                }}
                                className="font-body text-xs text-foreground hover:text-gold-dark tracking-[0.15em] uppercase transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground/60 hover:text-gold transition-colors"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="space-y-1.5">
                            <motion.div
                                className="w-6 h-[1.5px] bg-current"
                                animate={isMobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                            />
                            <motion.div
                                className="w-6 h-[1.5px] bg-current"
                                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            />
                            <motion.div
                                className="w-6 h-[1.5px] bg-current"
                                animate={isMobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                className="fixed inset-0 z-[99] md:hidden"
                initial={false}
                animate={isMobileOpen ? "open" : "closed"}
                variants={{
                    open: { visibility: "visible" as const },
                    closed: { visibility: "hidden" as const, transition: { delay: 0.3 } },
                }}
            >
                <motion.div
                    className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                    variants={{
                        open: { opacity: 1 },
                        closed: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item.href);
                            }}
                            className="font-body text-lg text-foreground/70 hover:text-gold tracking-[0.2em] uppercase transition-colors"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.1 + i * 0.05 },
                                },
                                closed: { opacity: 0, y: 20 },
                            }}
                        >
                            {item.label}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
