"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StoryData } from "@/types/wedding";

interface StoryProps {
    data: StoryData;
}

function TimelineEvent({
    event,
    index,
}: {
    event: StoryData["events"][0];
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`flex items-center gap-4 md:gap-8 mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
            initial={{ opacity: 0, y: 60, x: isLeft ? -30 : 30 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Content Card */}
            <div className={`md:w-5/12 w-full ${isLeft ? "md:text-right" : "md:text-left"}`}>
                <motion.div
                    className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Gold accent line */}
                    <div
                        className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-1 h-full bg-gradient-to-b from-gold via-gold-dark to-transparent`}
                    />

                    <span className="font-script text-gold text-3xl md:text-4xl">{event.year}</span>
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mt-2 mb-3">{event.title}</h3>
                    <p className="font-body text-foreground/80 text-sm leading-relaxed">{event.description}</p>

                    {/* Decorative corner */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/20" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/20" />
                </motion.div>
            </div>

            {/* Timeline Dot */}
            <div className="hidden md:flex flex-col items-center relative z-10">
                <motion.div
                    className="w-5 h-5 rounded-full border-2 border-gold bg-background"
                    style={{ boxShadow: "0 0 20px rgba(212,168,83,0.4)" }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                />
            </div>

            {/* Image */}
            <div className="md:w-5/12 w-full">
                <motion.div
                    className="rounded-2xl overflow-hidden aspect-[4/3] relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 to-transparent" />

                    {/* Fallback pattern if no image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-peach/20 to-gold/10 mix-blend-overlay" />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Story({ data }: StoryProps) {
    const sectionRef = useRef(null);
    const titleInView = useInView(sectionRef, { once: true, margin: "-50px" });

    if (!data?.enabled) return null;

    return (
        <section id="story" className="relative py-20 md:py-32 overflow-hidden" ref={sectionRef}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,168,83,0.3) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.p
                        className="font-body text-gold-dark text-xs tracking-[0.4em] uppercase mb-4"
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {data.subtitle}
                    </motion.p>
                    <motion.h2
                        className="font-script text-5xl md:text-7xl text-gradient-gold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {data.title}
                    </motion.h2>
                    <div className="section-divider" />
                </div>

                {/* Bride & Groom Sketches */}
                <div className="flex justify-between items-start mb-16 max-w-md mx-auto">
                    <motion.div
                        className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/20"
                        style={{ boxShadow: "0 0 30px rgba(212,168,83,0.15)" }}
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.groomSketch})` }}
                        />
                    </motion.div>

                    <motion.div
                        className="font-script text-burgundy text-3xl self-center"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        ❤
                    </motion.div>

                    <motion.div
                        className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/20"
                        style={{ boxShadow: "0 0 30px rgba(212,168,83,0.15)" }}
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.brideSketch})` }}
                        />
                    </motion.div>
                </div>

                {/* Timeline Line */}
                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent -translate-x-1/2" />

                    {/* Events */}
                    {data.events.map((event, index) => (
                        <TimelineEvent key={index} event={event} index={index} />
                    ))}
                </div>

                {/* Garland Exchange / Together Moment */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div
                        className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-2 border-gold/30 mb-6"
                        style={{ boxShadow: "0 0 50px rgba(212,168,83,0.2)" }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.coupleImage})` }}
                        />
                    </div>
                    <p className="font-script text-gold text-3xl md:text-4xl">Together Forever</p>
                </motion.div>
            </div>
        </section>
    );
}
