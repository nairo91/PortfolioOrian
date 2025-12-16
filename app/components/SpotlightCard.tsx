"use client";
import React, { useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const SpotlightCard = ({
    children,
    className = "",
    // J'ai augmenté l'opacité ici (0.45 au lieu de 0.25) pour plus de lumière
    spotlightColor = "rgba(16, 185, 129, 0.45)"
}: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            // CHANGEMENT ICI : 
            // 1. border-slate-700 (bordure plus claire)
            // 2. bg-slate-800/50 (fond plus clair que le slate-900)
            className={`relative rounded-2xl border border-slate-700 bg-slate-800/50 overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};