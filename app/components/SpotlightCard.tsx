"use client";
import React, { useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightSize?: number;
}

export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(16, 185, 129, 0.45)",
    spotlightSize = 600,
}: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-2xl border border-slate-700/60 bg-slate-800/40 overflow-hidden transition-all duration-300 hover:border-slate-600/80 ${className}`}
        >
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {/* Subtle border glow on hover */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl transition duration-300"
                style={{
                    opacity: opacity * 0.3,
                    background: `radial-gradient(${spotlightSize * 0.4}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
                }}
            />
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};
