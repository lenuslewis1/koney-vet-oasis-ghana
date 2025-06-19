import { motion } from "framer-motion";
import * as React from "react";
import { ReactNode } from "react";

// Use a looser type for variants to avoid type errors with custom transitions
const variants = {
  fadeIn: (duration: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration } },
  }),
  slideUp: (duration: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  }),
  slideRight: (duration: number) => ({
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration } },
  }),
  slideLeft: (duration: number) => ({
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration } },
  }),
  scale: (duration: number) => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration } },
  }),
  bounce: (duration: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration,
      },
    },
  }),
};

type AnimationVariant = keyof typeof variants;

interface AnimatedElementProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedElement = ({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
}: AnimatedElementProps) => {
  const selectedVariant = variants[variant](duration);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={selectedVariant}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
};
