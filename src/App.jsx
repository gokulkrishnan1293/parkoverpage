import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GravityStars from "./components/GravityStars";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(true);
  const nameRef = useRef(null);
  const name = "GOKUL";

  // Typewriter jumbling effect
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;

    const intervalId = setInterval(() => {
      if (!nameRef.current) return;

      const currentText = nameRef.current.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return name[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      nameRef.current.innerText = currentText;

      if (iteration >= name.length) {
        iteration = 0;
      } else {
        iteration += 1 / 3;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  // Individual letter animation
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  // Hover animation for individual letters
  const letterHover = {
    scale: 1.4,
    y: -20,
    rotateZ: [0, -15, 15, 0],
    filter: [
      "brightness(1) saturate(1) blur(0px)",
      "brightness(1.8) saturate(2) blur(1px)",
      "brightness(1) saturate(1) blur(0px)",
    ],
    transition: {
      duration: 0.5,
    },
  };

  return (
    <>
      <GravityStars isDark={isDark} />

      {/* Theme Toggle Button */}
      <motion.button
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={() => setIsDark(!isDark)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className={`screen ${isDark ? 'dark' : 'light'}`}>
        <div className="screen-content">
          {/* Floating container */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateZ: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Single text with typewriter effect */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="name-container"
              ref={nameRef}
            >
              {name}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;