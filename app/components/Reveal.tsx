"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "left" | "right";
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
}: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const mainControls = useAnimation();

    const getHiddenState = () => {
        switch (direction) {
            case "left": return { opacity: 0, x: -50 };
            case "right": return { opacity: 0, x: 50 };
            default: return { opacity: 0, y: 50 };
        }
    };

    const getVisibleState = () => {
        switch (direction) {
            case "left": return { opacity: 1, x: 0 };
            case "right": return { opacity: 1, x: 0 };
            default: return { opacity: 1, y: 0 };
        }
    };

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: getHiddenState(),
                    visible: getVisibleState(),
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};
