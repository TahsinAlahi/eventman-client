import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BlurIn({ children, className = "", duration = 1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
