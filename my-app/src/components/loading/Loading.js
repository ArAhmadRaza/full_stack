import { motion } from "framer-motion";
import "./loading.css"; // Import custom styles

export default function Loading() {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-ring"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />

      <div className="loading-dots">
        <motion.span
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.span
          animate={{ y: [-5, 5, -5] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.span
          animate={{ y: [-5, 5, -5] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </div>
    </div>
  );
}
