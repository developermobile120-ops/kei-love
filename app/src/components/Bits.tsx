import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A single cinematic line that fades up when it scrolls into view.
export function Line({
  children,
  className = "",
  delay = 0,
  size = "text-3xl sm:text-4xl",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  size?: string;
}) {
  return (
    <motion.p
      className={`cinema-text ${size} ${className}`}
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
}

// A small handwritten note (for captions / easter eggs).
export function Note({
  children,
  className = "",
  delay = 0,
  rotate = -3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.span
      className={`hand inline-block text-2xl sm:text-3xl ${className}`}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

// A section wrapper that pins a min-height and centers content.
export function Scene({
  id,
  children,
  className = "",
  extraTall = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  extraTall?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scene ${className}`}
      style={extraTall ? { minHeight: "160svh" } : undefined}
    >
      {children}
    </section>
  );
}
