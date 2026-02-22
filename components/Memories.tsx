"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MemoriesData, MemoryItem } from "@/types/wedding";

interface MemoriesProps {
    data: MemoriesData;
}

function Lightbox({
    item,
    onClose,
}: {
    item: MemoryItem;
    onClose: () => void;
}) {
    return (
        <motion.div
            className="lightbox-overlay cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="relative max-w-4xl max-h-[90vh] w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-contain rounded-lg"
                />
                <p className="text-center text-ivory/70 font-body text-sm mt-4">{item.caption}</p>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-gold/20 backdrop-blur-xl rounded-full border border-gold/30 flex items-center justify-center text-ivory hover:bg-gold/40 transition-colors"
                >
                    ✕
                </button>
            </motion.div>
        </motion.div>
    );
}

function MemoryCard({
    item,
    index,
    onClick,
}: {
    item: MemoryItem;
    index: number;
    onClick: () => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const heights = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];
    const aspectClass = heights[index % heights.length];

    return (
        <motion.div
            ref={ref}
            className={`${aspectClass} relative rounded-2xl overflow-hidden cursor-pointer group`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
            onClick={onClick}
            whileHover={{ y: -5 }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.src})` }}
            />

            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-maroon/40 to-gold/20" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <motion.div
                    className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                    <p className="font-body text-ivory text-sm">{item.caption}</p>
                </motion.div>
            </div>

            {/* Gold border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-colors duration-300" />
        </motion.div>
    );
}

export default function Memories({ data }: MemoriesProps) {
    if (!data?.enabled) return null;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);

    return (
        <section id="memories" className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.p
                        className="font-body text-gold/60 text-xs tracking-[0.4em] uppercase mb-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {data.subtitle}
                    </motion.p>
                    <motion.h2
                        className="font-script text-5xl md:text-7xl text-gradient-gold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {data.title}
                    </motion.h2>
                    <div className="section-divider" />
                </div>

                {/* Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {data.items.map((item, index) => (
                        <MemoryCard
                            key={index}
                            item={item}
                            index={index}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
